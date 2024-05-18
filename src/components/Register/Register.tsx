import type { FormProps } from 'antd';
import { Button, DatePicker, Flex, Form, Input, Radio } from 'antd';
import dayjs from 'dayjs';

type FieldType = {
  username: string;
  password: string;
  source: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  const { username, password, source, birthday } = values;
  const date = dayjs(birthday).format('YYYY-MM-DD');
  console.log('date', date);
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo);
};

const dateFormat = 'YYYY-MM-DD';

export const Register = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: '100vw', height: '100vh', paddingTop: '40px' }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Full name"
          name="username"
          rules={[
            { required: true, message: 'Please input your fullname!' },
            () => ({
              validator(_, value) {
                if (value === '') return Promise.resolve();
                if (!value) return Promise.reject();
                const fullname = value.split(' ');
                if (fullname[0].trim() && fullname[1]?.trim()) {
                } else {
                  return Promise.reject(
                    new Error('Please input your name and surname!')
                  );
                }
                console.log('value', value);
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input style={{ width: '330px' }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="password"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input style={{ width: '330px' }} />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="birthday"
          rules={[{ required: true, message: 'Please input your bithday!' }]}
        >
          <DatePicker
            format={{
              format: 'YYYY-MM-DD',
              type: 'mask',
            }}
            maxDate={dayjs(new Date())}
            style={{ width: '330px' }}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Where did you hear about this event?"
          name="source"
          initialValue="social"
          required
          labelCol={{ span: 20 }}
        >
          <Radio.Group style={{ width: '330px' }}>
            <Radio value="social"> Social media </Radio>
            <Radio value="friends"> Friends </Radio>
            <Radio value="myself"> Found myself </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
