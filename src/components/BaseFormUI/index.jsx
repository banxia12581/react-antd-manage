/**
 * @description 公共业务组件-基础表单布局
 */
import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import { Form, Select, Input, DatePicker, Checkbox, InputNumber, Radio, Space } from 'antd';

const BaseFormUI = ({ ...props }) => {
  const { data = {}, callback, getFormRef, layout } = props;
  const formRef = useRef({});
  /**
   * 初始化list数据
   */
  const initListData = (item, messagePrefix = '') => {
    // 是否可以操作
    item.disabled = item.disabled ? item.disabled : false;
    // 是否必填项
    item.required = item.required === false ? false : true;
    // 是否必填项
    item.rules = item.rules ? item.rules : [{ required: item.required, message: `请${messagePrefix}${item.label}` }];
    return item;
  };

  let listInit = _.cloneDeep(props.list);
  listInit.map(item => {
    let messagePrefix = '选择';
    if (item.key === 'input' || item.key === 'inputNumber' || item.key === 'textArea') {
      messagePrefix = '输入';
    }
    item = initListData(item, messagePrefix);
    item.textArea = item.textArea ? item.textArea : {};
    item.textArea = initListData(item.textArea, '输入');
  });
  let [list, setList] = useState(listInit);
  let layoutInit = {
    labelCol: { span: layout.labelCol },
    wrapperCol: { span: layout.wrapperCol },
  };

  useEffect(() => {
    if (data.initFieldsValueFlag) {
      formRef.current.setFieldsValue(data);
    }
  }, [data]);

  useEffect(() => {
    if (formRef) {
      getFormRef && getFormRef(formRef);
    }
  }, []);

  /**
   * 输入框类型
   * @param {object} item 表单项
   */
  const inputContent = item => {
    return (
      <>
        {item.children ? (
          item.children
        ) : (
          <Form.Item label={item.label} name={item.key} rules={item.rules} disabled={item.disabled}>
            <Input placeholder={`请输入${item.label}`} />
          </Form.Item>
        )}
      </>
    );
  };

  /**
   * 数字类型输入框类型
   * @param {object} item 表单项
   */
  const inputNumberContent = item => {
    return (
      <>
        {item.children ? (
          item.children
        ) : (
          <Form.Item label={item.label} className={classnames({ required: item.required })}>
            <Form.Item noStyle name={item.key} rules={item.rules} disabled={item.disabled}>
              <InputNumber style={{ width: '50%' }} step={item.step} min={item.min} max={item.max} precision={item.precision} />
            </Form.Item>
            <span style={{ marginLeft: '10px' }}>{item.unit}</span>
          </Form.Item>
        )}
      </>
    );
  };

  /**
   * 文本域类型
   * @param {object} item 表单项
   * @param {string} type 文本域类型 other-其他类型下选择其他时展示
   */
  const textAreaContent = (item, type = 'other') => {
    let areaLayout = {};
    let label = item.label;
    if (type === 'other') {
      areaLayout = { wrapperCol: { offset: layout.labelCol, span: layout.wrapperCol } };
      label = null;
    }
    return (
      <>
        {item.children ? (
          item.children
        ) : (
          <Form.Item {...areaLayout} label={label} name={item.key} rules={item.rules} disabled={item.disabled}>
            <Input.TextArea maxLength={500} rows={3} placeholder={`请输入${item.label}`} allowClear />
          </Form.Item>
        )}
      </>
    );
  };

  /**
   * 多选操作
   * @param {any} checkedValues 选择的数组
   * @param {number} index 选择的表单项的索引
   * @return {void} 无
   */
  const checkboxChange = (checkedValues, index) => {
    let formListInit = _.cloneDeep(list);
    let formItem = formListInit[index];
    formItem.option = checkedValues;
    setList(formListInit);
  };

  /**
   * 多选框类型
   * @param {object} item 表单项
   * @param {number} index 表单项索引值
   */
  const checkboxContent = (item, index) => {
    return (
      <>
        {item.children ? (
          item.children
        ) : (
          <Form.Item label={item.label} name={item.key} rules={item.rules} disabled={item.disabled}>
            <Checkbox.Group onChange={checkedValues => checkboxChange(checkedValues, index)}>
              {item.list.length !== 0
                ? item.list.map(listItem => (
                    <Checkbox key={listItem.id} value={listItem.id}>
                      {listItem.name}
                    </Checkbox>
                  ))
                : null}
            </Checkbox.Group>
          </Form.Item>
        )}
      </>
    );
  };

  /**
   * 日期类型-可选时间范围
   * @param {object} item 表单项
   */
  const setDisabledDate = (current, item) => {
    if (item.dateMinExpression && item.dateMaxExpression) {
      return current && (current < item.dateMinExpression || current > item.dateMaxExpression);
    } else if (item.dateMinExpression) {
      return current && current < item.dateMinExpression;
    } else if (item.dateMaxExpression) {
      return current && current > item.dateMaxExpression;
    }
  };

  /**
   * 日期类型
   * @param {object} item 表单项
   */
  const dateContent = item => {
    const format = item.format ? item.format : 'YYYY-MM-DD HH:mm:ss';
    const showTime = item.showTime === false ? false : true;

    return (
      <>
        {item.children ? (
          item.children
        ) : (
          <Form.Item label={item.label} name={item.key} rules={item.rules} disabled={item.disabled}>
            <DatePicker showTime={showTime} format={format} disabledDate={current => setDisabledDate(current, item)} />
          </Form.Item>
        )}
      </>
    );
  };

  /**
   * 下拉选项操作
   * @param {any} id 选择的id
   * @param {Object} option 选择的对象
   * @param {number} index 选择的表单项的索引
   * @return {void} 无
   */
  const selectChange = (id, option, index) => {
    let formListInit = _.cloneDeep(list);
    let chooseItem = formListInit[index];
    if (id === chooseItem.option.value) return false;
    chooseItem.option = option;
    setList([...formListInit]);
  };

  /**
   * 下拉类型
   * @param {object} item 表单项
   * @param {number} index 表单项索引值
   */
  const selectContent = (item, index) => {
    return (
      <>
        {item.children ? (
          item.children
        ) : (
          <>
            <Form.Item label={item.label} name={item.key} rules={item.rules} disabled={item.disabled}>
              <Select onChange={(id, option) => selectChange(id, option, index)} placeholder='请选择' allowClear optionFilterProp='children' showSearch>
                {item.list.length !== 0
                  ? item.list.map(listItem => (
                      <Select.Option key={listItem.id} value={listItem.id}>
                        {listItem.name}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
            {/* 下拉项中有需要文本输入的情况 */}
            {item.textArea.code && item.option.value === item.textArea.code ? textAreaContent(item.textArea) : null}
          </>
        )}
      </>
    );
  };

  /**
   * 单选项操作
   */
  const radioChange = (e, index) => {
    const value = e.target.value;
    let formListInit = _.cloneDeep(list);
    let chooseItem = formListInit[index];
    chooseItem.option.value = value;
    setList(formListInit);
  };

  /**
   * 单选项类型
   * @param {object} item 表单项
   * @param {number} index 表单项索引值
   */
  const radioContent = (item, index) => {
    let textAreaItem = item.textArea ? item.textArea : {};
    return (
      <>
        {item.children ? (
          item.children
        ) : (
          <>
            <Form.Item label={item.label} name={item.key} rules={[{ required: item.required, message: `请选择${item.label}` }]} disabled={item.disabled}>
              <Radio.Group onChange={e => radioChange(e, index)}>
                {item.list.length !== 0
                  ? item.list.map((listItem, listItemIndex) => (
                      <Radio key={listItemIndex} value={listItem.id}>
                        {listItem.name}
                      </Radio>
                    ))
                  : null}
              </Radio.Group>
            </Form.Item>
            {/* 下拉项中有需要文本输入的情况 */}
            {textAreaItem.code && item.option.value === textAreaItem.code ? textAreaContent(textAreaItem) : null}
          </>
        )}
      </>
    );
  };

  /**
   * 纯文本类型
   * @param {object} item 表单项
   * @param {number} index 表单项索引值
   */
  const textContent = item => {
    return (
      <Form.Item label={item.label} name={item.key}>
        <Space>{item.children ? item.children : item.value}</Space>
      </Form.Item>
    );
  };

  /**
   * 提交操作
   */
  const handleSubmit = value => {
    callback && callback(value, list);
  };

  return (
    <Form {...layoutInit} labelAlign='left' ref={formRef} onFinish={handleSubmit}>
      {list.map((formItem, formIndex) => {
        return (
          <Fragment key={formIndex}>
            {formItem.fieldtype === 'input' && inputContent(formItem)}
            {formItem.fieldtype === 'inputNumber' && inputNumberContent(formItem)}
            {formItem.fieldtype === 'date' && dateContent(formItem)}
            {formItem.fieldtype === 'select' && selectContent(formItem, formIndex)}
            {formItem.fieldtype === 'checkbox' && checkboxContent(formItem, formIndex)}
            {formItem.fieldtype === 'radio' && radioContent(formItem, formIndex)}
            {formItem.fieldtype === 'textArea' && textAreaContent(formItem, '')}
            {formItem.fieldtype === 'text' && textContent(formItem)}
          </Fragment>
        );
      })}
    </Form>
  );
};

BaseFormUI.propTypes = {
  callback: PropTypes.func, // 回调函数
  data: PropTypes.object.isRequired, // 基础数据对象 必传
  layout: PropTypes.object, // 表单布局
  list: PropTypes.array, // 表单项数组
  getFormRef: PropTypes.func, // 获取formRef方法
};

BaseFormUI.defaultProps = {
  data: {},
  list: [],
  layout: {
    labelCol: 6,
    wrapperCol: 18,
  },
};

export default BaseFormUI;
