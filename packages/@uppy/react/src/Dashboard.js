import { createElement as h, Component } from 'react'
import DashboardPlugin from '@uppy/dashboard'
import { dashboard as basePropTypes } from './propTypes.js'
import getHTMLProps from './getHTMLProps.js'
import nonHtmlPropsHaveChanged from './nonHtmlPropsHaveChanged.js'

/**
 * React Component that renders a Dashboard for an Uppy instance. This component
 * renders the Dashboard inline, so you can put it anywhere you want.
 */

class Dashboard extends Component {
  #htmlProps

  componentDidMount () {
    this.installPlugin()
  }

  componentDidUpdate (prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.uppy !== this.props.uppy) {
      this.uninstallPlugin(prevProps)
      this.installPlugin()
    } else if (nonHtmlPropsHaveChanged(this, prevProps)) {
      const options = { ...this.props, target: this.container }
      delete options.uppy
      this.plugin.setOptions(options)
    }
  }

  componentWillUnmount () {
    this.uninstallPlugin()
  }

  installPlugin () {
    const { uppy } = this.props
    const options = {
      id: 'react:Dashboard',
      ...this.props,
      target: this.container,
    }
    delete options.uppy
    uppy.use(DashboardPlugin, options)

    this.plugin = uppy.getPlugin(options.id)
  }

  uninstallPlugin (props = this.props) {
    const { uppy } = props

    uppy.removePlugin(this.plugin)
  }

  [Symbol.for('htmlProps')] () { return this.#htmlProps }

  render () {
    this.#htmlProps = getHTMLProps(this.props)
    return h('div', {
      className: 'uppy-Container',
      ref: (container) => {
        this.container = container
      },
      ...this.#htmlProps,
    })
  }
}

Dashboard.propTypes = basePropTypes

Dashboard.defaultProps = {
  inline: true,
}

export default Dashboard
