/**
 * @description 首页
 */
import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'antd';
import Edit from './components/Edit';
import './index.less';

const Home = () => {
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);

  /**
   * 编辑操作
   */
  const handleEdit = () => {
    setVisible(true);
  };

  return (
    <div className='home'>
      <Row>
        <Col span={12}>
          <Card title='表单组件'>
            <Button type='primary' onClick={handleEdit}>
              编辑
            </Button>
          </Card>
        </Col>
      </Row>
      <Edit visible={visible} data={data} />
    </div>
  );
};

export default Home;
