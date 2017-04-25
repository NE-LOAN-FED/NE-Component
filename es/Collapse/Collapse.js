function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by kisnows on 2017/2/17.
 */
import React, { Component, PropTypes } from 'react';

var Collapse = function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleListChange = function (id, collapse) {
      // TODO 把 openListIdCollection 改为不可重复的数据结构 set
      var _this$state = _this.state,
          openListIdCollection = _this$state.openListIdCollection,
          listCollection = _this$state.listCollection;
      var accordion = _this.props.accordion;

      listCollection[id]['isCollapse'] = collapse;

      function removeCollapseListId() {
        return openListIdCollection.filter(function (value) {
          return value !== id;
        });
      }

      function addIdToCollapseListId(id) {
        openListIdCollection.indexOf(id) === -1 && openListIdCollection.push(id);
      }

      if (accordion) {
        openListIdCollection = collapse ? removeCollapseListId() : [id];
      } else {
        collapse ? removeCollapseListId() : addIdToCollapseListId(id);
      }
      openListIdCollection = openListIdCollection.length ? openListIdCollection : [];
      _this.props.onListChange(openListIdCollection);
      _this.setState({
        openListIdCollection: openListIdCollection,
        listCollection: listCollection
      });
    };

    _this.renderList = function () {
      var _this$state2 = _this.state,
          openListIdCollection = _this$state2.openListIdCollection,
          listCollection = _this$state2.listCollection;

      var subComponent = _this.props.subComponent;
      return listCollection.map(function (v, k) {
        v.isCollapse = openListIdCollection.indexOf(k) === -1;
        return React.cloneElement(subComponent, {
          data: v,
          onChange: _this.handleListChange,
          id: k,
          key: k
        });
      });
    };

    _this.state = {
      // 当前打开元素的集合
      openListIdCollection: _this.props.openListIdCollection || [],
      // SubComponent 渲染所需要的数据集合
      listCollection: _this.props.listCollection || []
    };
    return _this;
  }

  Collapse.prototype.render = function render() {
    var Lists = this.renderList();

    var _props = this.props,
        prefixCls = _props.prefixCls,
        openListIdCollection = _props.openListIdCollection,
        listCollection = _props.listCollection,
        accordion = _props.accordion,
        onListChange = _props.onListChange,
        subComponent = _props.subComponent,
        others = _objectWithoutProperties(_props, ['prefixCls', 'openListIdCollection', 'listCollection', 'accordion', 'onListChange', 'subComponent']);

    return React.createElement(
      'div',
      others,
      Lists
    );
  };

  return Collapse;
}(React.Component);

Collapse.propTypes = {
  prefixCls: PropTypes.string,
  openListIdCollection: PropTypes.arrayOf(PropTypes.number),
  listCollection: PropTypes.array.isRequired,
  // 手风琴模式
  accordion: PropTypes.bool,
  onListChange: PropTypes.func,
  subComponent: PropTypes.element
};
Collapse.defaultProps = {
  prefixCls: 'NEUI'
};
export default Collapse;