/**
 * @description 编辑
 */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Modal } from 'antd';
import { FireFilled } from '@ant-design/icons';
import BaseFormUI from '@/components/BaseFormUI';

const Edit = ({ ...props }) => {
  const { visible, data = {}, onCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formRef, setFormRef] = useState({});

  /**
   * 操作-关闭弹框
   * @param {string} type 要关闭的弹框key值
   * @param {boolean} refresh 弹窗关闭后是否刷新列表
   * @return {void} 无
   */
  const handleCancel = refresh => {
    setConfirmLoading(false);
    formRef.current.resetFields();
    onCancel && onCancel(refresh);
  };

  /**
   * 确定操作
   */
  const handleOk = () => {
    formRef.current.submit();
  };

  useEffect(() => {
    if (visible) {
      //
    }
  }, [visible]);

  /**
   * 设置表单的ref
   */
  const getFormRef = formRef => {
    setFormRef(formRef);
  };

  /**
   * 回调函数
   */
  const callback = (value, list) => {
    console.log('value', value);
    console.log('list', list);
  };

  // 列表
  const list = [
    {
      fieldtype: 'radio',
      label: '产品性质',
      key: 'ware',
      list: [
        {
          id: 1,
          name: '堪品',
        },
        {
          id: 2,
          name: '新品',
        },
      ],
      option: {},
    },
    {
      fieldtype: 'text',
      label: '促销活动',
      key: 'activity',
      children: (
        <div>
          <FireFilled style={{ color: '#d80000', marginRight: '5px' }} />
          双十一活动
        </div>
      ),
    },
    {
      fieldtype: 'input',
      label: '名称',
      key: 'title',
    },
    {
      fieldtype: 'inputNumber',
      label: '价格',
      key: 'price',
      unit: '元',
      step: 0.01,
      precision: 2,
      min: 0.01,
    },
    {
      fieldtype: 'select',
      label: '颜色',
      key: 'color',
      list: [
        {
          id: 1,
          name: '黑色',
        },
        {
          id: 2,
          name: '白色',
        },
        {
          id: 99,
          name: '其他',
        },
      ],
      option: {},
      textArea: {
        code: 99,
        label: '其他颜色',
        key: 'otherColor',
        option: {},
      },
    },
    {
      fieldtype: 'date',
      label: '上架时间',
      key: 'onShelfTime',
      dateMinExpression: new Date().getTime(),
      dateMaxExpression: moment().add('7', 'days'), // 只可以选择今天开始7天内的日期
    },
    {
      fieldtype: 'checkbox',
      label: '尺码',
      key: 'size',
      list: [
        {
          id: 1,
          name: 'S',
        },
        {
          id: 2,
          name: 'M',
        },
        {
          id: 3,
          name: 'L',
        },
      ],
      option: {},
    },
  ];

  const config = {
    data: {
      ...data,
      initFieldsValueFlag: true,
    },
    list: list,
    getFormRef: getFormRef,
    callback: callback,
  };

  return (
    <Modal title='编辑' visible={visible} confirmLoading={confirmLoading} onOk={() => handleOk()} onCancel={() => handleCancel(false)}>
      <BaseFormUI {...config} />
    </Modal>
  );
};

export default Edit;
