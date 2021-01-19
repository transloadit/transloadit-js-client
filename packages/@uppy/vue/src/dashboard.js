import DashboardPlugin from '@uppy/dashboard'
import { shallowEqualObjects } from 'shallow-equal'

// Cross compatibility dependencies
import { h as createElement } from 'vue'
import { isVue2 } from './utils'

export default {
  data () {
    return {
      plugin: {}
    }
  },
  props: {
    uppy: {
      required: true
    },
    props: {
      type: Object
    },
    plugins: {
      type: Array
    }
  },
  mounted () {
    this.installPlugin()
  },
  methods: {
    installPlugin () {
      const uppy = this.uppy
      const options = {
        id: 'vue:Dashboard',
        inline: true,
        plugins: this.plugins,
        ...this.props,
        target: this.$refs.container
      }
      uppy.use(DashboardPlugin, options)
      this.plugin = uppy.getPlugin(options.id)
    },
    uninstallPlugin (uppy) {
      uppy.removePlugin(this.plugin)
    }
  },
  // beforeDestroy () {
  //   this.uninstallPlugin(this.uppy)
  // },
  beforeUnmount () {
    this.uninstallPlugin(this.uppy)
  },
  watch: {
    uppy (current, old) {
      if (old !== current) {
        this.uninstallPlugin(old)
        this.installPlugin()
      }
    },
    props (current, old) {
      if (!shallowEqualObjects(current, old)) {
        this.plugin.setOptions({ ...current })
      }
    }
  },
  render (...args) {
    // Hack to allow support for Vue 2 and 3
    if (isVue2(...args)) {
      // If it's first argument is a function, then it's a Vue 2 App
      const [createElement] = arguments
      return createElement('div', {
        ref: 'container'
      })
    } else {
      // Other wise, we import the `h` function from the Vue package (in Vue 3 fashion)
      return createElement('div', {
        ref: 'container'
      })
    }
  }
}
