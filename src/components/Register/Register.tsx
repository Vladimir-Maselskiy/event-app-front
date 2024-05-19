import type { FormProps } from 'antd';
import { Button, DatePicker, Flex, Form, Input, Radio } from 'antd';
import dayjs from 'dayjs';
import { createRegistration } from '../../utils/api';

import { BackButton } from '../UI/BackButton/BackButton';
import { useState } from 'react';
import { ThanksPage } from '../ThanksPage/ThanksPage';

type FieldType = {
  username: string;
  email: string;
  source: string;
  birthday: string;
};

export const Register = () => {
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const eventId = queryParams.get('eventId');
  const eventTitle = queryParams.get('eventTitle');

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    if (!eventId) {
      onFinishFailed('Something went wrong' as any);
      return;
    }
    const { username, email, source, birthday } = values;
    const date = dayjs(birthday).format('YYYY-MM-DD');
    console.log('date', date);
    console.log('Success:', values);
    const registrationDate = dayjs(new Date()).format('YYYY-MM-DD');
    const user = {
      username,
      email,
      source,
      birthday: date,
      registrationDate,
    };
    try {
      const res = await createRegistration({ user, eventId });
      if (res) {
        setIsRegistrationComplete(true);
        setTimeout(
          () =>
            (window.location.href = `/view?eventId=${eventId}&eventTitle=${eventTitle}`),
          3000
        );
      }
    } catch (error) {
      onFinishFailed(error as any);
    }
  };

  return !isRegistrationComplete ? (
    <Flex vertical style={{ paddingTop: 100 }}>
      <BackButton />
      <Flex justify="center" align="center" vertical={true}>
        <h3>Please, fill the form below</h3>
        <Flex justify="center" style={{ width: '100vw', height: '100vh' }}>
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
              name="email"
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
              rules={[
                { required: true, message: 'Please input your bithday!' },
              ]}
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
      </Flex>
    </Flex>
  ) : (
    <ThanksPage />
  );
};
