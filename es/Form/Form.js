var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by kisnows on 2016/12/26.
 */
import React from 'react';
import classNames from 'classnames';
import { isFormComplete, formPure, isFromValidate } from './FormUtils';
import isEqual from 'lodash/isEqual';

var PropTypes = React.PropTypes;

// TODO 完成 Form 重构

var env = process.env || process.env.NODE_ENV === 'development' ? 'DEBUG' : 'PROD';
// 标识当前 Form 处于的状态
var STATUS = {
  Init: 'Init',
  Normal: 'Normal',
  FieldChange: 'FieldChange',
  UpdateFormDataStructure: 'UpdateFormDataStructure',
  Submit: 'Submit'
};

var noop = function noop() {};

var Form = function (_React$PureComponent) {
  _inherits(Form, _React$PureComponent);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.collectFormField = function (children) {
      // TODO 优化性能，当 Field 已经有 key 的时候，就不重新 clone 了
      var handleFieldChange = _this.handleFieldChange;

      /* 简单粗暴，在 Form 更新的时候直接清空上一次保存的 formFields，全量更新，避免 formFields 内容或者数量发生变化时 this.formFields 数据不正确的问题 */
      var FormFields = _this.formFields = [];

      /**
       * 用来保存 clone 后的子组件的实例
       */
      var Fields = _this.field = [];

      function getChildList(children) {
        return React.Children.map(children, function (el, i) {
          // 只要 Name 以 _Field 开头，就认为是需要 From 管理的组件
          if (!el || el === null) return null;

          var reg = /^_Field/;
          var childName = el.type && el.type.name;
          if (reg.test(childName)) {
            var child = React.cloneElement(el, {
              key: i,
              ref: function ref(_ref) {
                _ref && Fields.push(_ref);
              },
              handleFieldChange: handleFieldChange
            });
            FormFields.push(child);
            return child;
          } else {
            if (el.props && el.props.children) {
              var _children = getChildList(el.props.children);
              return React.cloneElement(el, {
                key: i,
                children: _children
              });
            } else {
              return el;
            }
          }
        });
      }

      return getChildList(children);
    };

    _this.initFormDataStructure = function () {
      _this.CURRENT_STATUS = STATUS.Init;
      var formData = _extends({}, _this.state.data);
      _this.formFields.forEach(function (formField, k) {
        var Props = formField.props;
        var Data = formField.data;
        var Name = Props.name;
        // TODO 重写初始化 Form data 方法
        formData[Name] = _this.updateFieldData(Props);
      });
      var nextState = _extends({}, _this.state, {
        isComplete: isFormComplete(formData),
        data: formData
      });
      _this.handleFormChange(nextState);
      _this.setStateAndCurrentStatus(nextState, STATUS.Normal);
    };

    _this.updateFormDataStructure = function () {
      _this.CURRENT_STATUS = STATUS.UpdateFormDataStructure;
      var formData = _extends({}, _this.currentState.data);

      var formItems = [];
      // 在 formData 中添加新加入的表单项
      _this.formFields.forEach(function (formField, k) {
        var Props = formField.props;
        var Name = Props.name;
        formItems.push(Name);
        /* 如果新增加了子表单，则添加对应 name 的 key */
        if (typeof formData[Name] === 'undefined') {
          formData[Name] = _this.updateFieldData(Props);
        }
      });
      /* TODO 由于 field 没有动态删除，所以暂时做不到从 formData 中去掉删除的表单项 */
      Object.keys(formData).forEach(function (v) {
        if (formItems.indexOf(v) === -1) {
          delete formData[v];
        }
      });
      var nextState = _extends({}, _this.state, {
        isComplete: isFormComplete(formData),
        data: formData
      });
      _this.handleFormChange(nextState);
      _this.setStateAndCurrentStatus(nextState, STATUS.Normal);
    };

    _this.handleFieldChange = function (fieldData) {
      _this.CURRENT_STATUS = STATUS.FieldChange;
      // TODO 由于 setState 是异步的，所以这里需要爱一个地方存放临时的 state
      var state = _extends({}, _this.currentState, {
        data: _extends({}, _this.currentState.data)
      });

      var name = fieldData.name;
      if (state.data[name]) {
        state.data[name] = _extends({}, state.data[name], fieldData);
      } else {
        state.data[name] = fieldData;
      }

      // TODO 重写 isFormComplete
      state.isComplete = isFormComplete(state.data);
      _this.props.onFieldChange(fieldData);

      // 为了避免传入 state 被外界修改，所以传入一个新的对象
      var nextState = _extends({}, state, {
        data: _extends({}, state.data)
      });
      _this.handleFormChange(nextState);
      _this.setStateAndCurrentStatus(nextState, STATUS.Normal);
    };

    _this.handleFormChange = function (state) {
      _this.props.onChange(state);
    };

    _this.formSubmit = function () {
      _this.CURRENT_STATUS = STATUS.Submit;
      var onSubmit = _this.props.onSubmit;

      var state = _extends({}, _this.state, {
        data: _extends({}, _this.state.data)
      });
      // TODO 重写 isFromValidate
      state = isFromValidate(state);
      var isValidate = state.isValidate;
      if (isValidate) {
        formPure(_extends({}, state.data)).then(function (pureData) {
          return onSubmit(isValidate, state, pureData);
        });
      } else {
        onSubmit(isValidate, state, null);
      }
      _this.setStateAndCurrentStatus(state, STATUS.Normal);
    };

    _this.handleFormSubmit = function (e) {
      e.preventDefault();
      _this.formSubmit();
    };

    _this.state = {
      isComplete: false,
      isValidate: false,
      data: {},
      errorMsgList: []
    };
    // 存放 clone 前的原始子组件
    _this.formFields = [];
    _this.children = [];
    // 标识当前 Form 处于哪个状态
    _this.CURRENT_STATUS = STATUS.Normal;
    // 由于 setState 是异步的，所以需要存放一个最新 state 的地方
    _this.currentState = Object.assign({}, _this.state);
    _this.setStateAndCurrentStatus = function (nextState, nextSTATUS) {
      var _this2 = this;

      this.currentState = nextState;
      this.setState(nextState, function () {
        /* eslint no-unused-expressions:0 */
        typeof nextSTATUS === 'undefined' ? _this2.CURRENT_STATUS = nextSTATUS : null;
        /* eslint no-unused-expressions:1 */
      });
    };
    return _this;
  }

  Form.prototype.componentWillMount = function componentWillMount() {
    this.children = this.collectFormField(this.props.children);
    this.initFormDataStructure();
  };

  Form.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.children, this.props.children) && this.CURRENT_STATUS !== STATUS.Submit) {
      this.children = this.collectFormField(nextProps.children);
      if (this.CURRENT_STATUS === STATUS.Normal) {
        this.updateFormDataStructure();
      }
    }
  };

  /**
   * 更新子表单的基础数据
   * @param {object} props 传入的 props
   */
  Form.prototype.updateFieldData = function updateFieldData(props) {
    return {
      value: props.value,
      errorMsg: props.errorMsg || props.name + ' \u586B\u5199\u9519\u8BEF',
      validate: props.validate,
      shouldRsa: props.shouldRsa,
      required: typeof props.required === 'undefined' ? true : props.required
    };
  };

  /**
   * 初始化 FormData 结构，给 this.state.data 添加 key 为表单项 name 的属性
   */


  /**
   * 更新 FormData 结构，当 Form 下表单项添加或删除时，将 FormData 结构更新到最新
   */


  /**
   * 由 Form 管理的子表单变化时触发的回掉函数，会对外触发 onFieldChange 和 onFormChange 事件
   * @param fieldData {object} 由子表单传入的参数
   */


  /**
   * Form 发生变化时触发的回调函数，同时对外触发 onFormChange 事件
   * @param state {object} 当前的表单 state
   */


  /**
   * 提交事件，对外触发 onSubmit 事件
   */


  Form.prototype.render = function render() {
    var _classNames,
        _this3 = this;

    var prefix = 'NEUI';
    var className = this.props.className;

    var cls = classNames((_classNames = {}, _classNames[prefix + '_cells'] = true, _classNames[className] = className, _classNames));
    return React.createElement(
      'form',
      {
        className: cls,
        onSubmit: function onSubmit(e) {
          return _this3.handleFormSubmit(e);
        }
      },
      this.children
    );
  };

  _createClass(Form, [{
    key: 'data',
    get: function get() {
      return this.state;
    }

    /**
     * 递归遍历收集所有需要管理的表单组件，并注册 handleFieldChange 方法
     * @param children
     * @returns {*} 处理过的 children
     */

  }]);

  return Form;
}(React.PureComponent);

Form.propTypes = {
  onFieldChange: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};
Form.defaultProps = {
  onFieldChange: noop,
  onChange: noop,
  onSubmit: noop
};
export default Form;