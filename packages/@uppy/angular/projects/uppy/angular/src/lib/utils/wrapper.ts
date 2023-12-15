import type { Uppy, UIPlugin } from '@uppy/core';
import type { ElementRef, SimpleChanges } from '@angular/core';
// @ts-expect-error
import type { DragDropOptions } from '@uppy/drag-drop';
// @ts-expect-error
import type { StatusBarOptions } from '@uppy/status-bar';
// @ts-expect-error
import type { ProgressBarOptions } from '@uppy/progress-bar';
import { Body, Meta } from '@uppy/utils/lib/UppyFile';

export abstract class UppyAngularWrapper<
  M extends Meta,
  B extends Body,
  PluginType extends UIPlugin<any, M, B> = UIPlugin<any, M, B>,
> {
  abstract props: DragDropOptions | StatusBarOptions | ProgressBarOptions;
  abstract el: ElementRef;
  abstract uppy: Uppy<M, B>;
  private options: any;
  plugin: PluginType | undefined;

  onMount(
    defaultOptions: Record<string, unknown>,
    plugin: new (
      uppy: Uppy<M, B>,
      opts?: Record<string, unknown>,
    ) => UIPlugin<any, M, B>,
  ) {
    this.options = {
      ...defaultOptions,
      ...this.props,
    };

    this.uppy.use(plugin, this.options);
    this.plugin = this.uppy.getPlugin(this.options.id) as PluginType;
  }

  handleChanges(changes: SimpleChanges, plugin: any): void {
    // Without the last part of this conditional, it tries to uninstall before the plugin is mounted
    if (
      changes['uppy'] &&
      this.uppy !== changes['uppy'].previousValue &&
      changes['uppy'].previousValue !== undefined
    ) {
      this.uninstall(changes['uppy'].previousValue);
      this.uppy.use(plugin, this.options);
    }
    this.options = { ...this.options, ...this.props };
    this.plugin = this.uppy.getPlugin(this.options.id) as PluginType;
    if (
      changes['props'] &&
      this.props !== changes['props'].previousValue &&
      changes['props'].previousValue !== undefined
    ) {
      this.plugin.setOptions({ ...this.options });
    }
  }

  uninstall(uppy = this.uppy): void {
    uppy.removePlugin(this.plugin!);
  }
}
