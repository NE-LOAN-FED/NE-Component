function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Animation from '../_utils/animation';
import Animate from 'rc-animate';
import { Cells, Cell, CellBody, CellFooter, Icon } from '../index';

var List = function (_Component) {
  _inherits(List, _Component);

  function List(props) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = function () {
      _this.toggle();
    };

    _this.toggle = function (collapse) {
      var id = _this.props.id;
      var nextCollapse = collapse ? collapse : !_this.state.isCollapse;
      _this.props.onChange(id, nextCollapse);
      _this.setState({
        isCollapse: nextCollapse
      });
    };

    _this.state = {
      isCollapse: _this.props.data.isCollapse || true
    };
    return _this;
  }

  List.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.data.isCollapse && nextProps.data.isCollapse !== this.state.isCollapse) {
      this.setState({
        isCollapse: nextProps.data.isCollapse
      });
    }
  };

  List.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        data = _props.data,
        className = _props.className,
        prefixCls = _props.prefixCls,
        onClick = _props.onClick;
    var title = data.title,
        content = data.content;
    var isCollapse = this.state.isCollapse;

    var cls = classNames((_classNames = {}, _classNames[prefixCls + '_collapse'] = true, _classNames[className] = className, _classNames));

    function FirstChild(props) {
      var childrenArray = React.Children.toArray(props.children);
      return childrenArray[0] || null;
    }

    return React.createElement(
      'div',
      { className: cls, onClick: onClick },
      React.createElement(
        Cells,
        { onClick: this.handleClick },
        React.createElement(
          Cell,
          null,
          React.createElement(
            CellBody,
            null,
            title
          ),
          React.createElement(
            CellFooter,
            null,
            React.createElement(Icon, { type: 'arrow',
              className: classNames({
                collapse: isCollapse,
                list_icon: true
              }) })
          )
        )
      ),
      React.createElement(
        Animate,
        { animation: Animation, component: FirstChild },
        !isCollapse ? React.createElement(
          'div',
          { className: 'list_content_wrap' },
          React.createElement(
            'p',
            { className: 'list_content', key: this },
            content
          )
        ) : null
      )
    );
  };

  return List;
}(Component);

List.propTypes = {
  prefixCls: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.node,
    content: PropTypes.node,
    isCollapse: PropTypes.bool
  }),
  onChange: PropTypes.func,
  id: PropTypes.number
};
List.defaultProps = {
  prefixCls: 'NEUI',
  data: {}
};
export default List;