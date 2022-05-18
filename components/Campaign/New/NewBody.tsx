import { Divider, Form, Input, InputNumber, Select } from "antd";

export default function NewBody({ countries }: any) {

 const onFinish = async (values: any) => {
     console.log(values)
 }


  return (
    <div>
      <h1 className="text-xl mb-4">Start a new campaign today!</h1>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        wrapperCol={{ span: 16 }}
        layout="vertical"
      >
        <Divider orientation="left">Campaign Details</Divider>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input your campaign name!" },
          ]}
        >
          <Input placeholder="Enter your campaign name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input your campaign description!",
            },
          ]}
        >
          <Input.TextArea rows={6} placeholder="Enter campaign descriptin" />
        </Form.Item>
        <Form.Item
          name="targetAmount"
          label="Target Amount"
          rules={[
            {
              required: true,
              message: "Please input your campaign target amount!",
            },
          ]}
        >
          <InputNumber
            min={0}
            placeholder="Enter campaign target amount"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please select your country" }]}
        >
          <Select showSearch placeholder="Select your country">
            {countries.map((country: any) => (
              <Select.Option key={country.id} value={country.iso_alpha2}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="currency"
          label="Currency"
          rules={[{ required: true, message: "Please select your currency" }]}
        >
          <Select showSearch placeholder="Select your currency">
            {countries.map((country: any) => (
              <Select.Option key={country.id} value={country.currency_code}>
                {country.currency_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Divider orientation="left">Rapyd Credentials</Divider>
        <p className="mr-3 text-sm">
          You can find your Rapyd Payments keys in your{" "}
          <a href="https://dashboard.rapyd.net/developers/credentials">
            Rapyd Dashboard
          </a>
          . This site is only for demo purposes do not use your production
          credentials. You can self host embd for production.
        </p>
        <Form.Item
          name="rapydSecretToken"
          label="Rapyd Secret Token"
          rules={[
            {
              required: true,
              message: "Please input your Rapyd Secret Token!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your Rapyd Secret Token" />
        </Form.Item>
        <Form.Item
          name="rapydAccessToken"
          label="Rapyd Access Token"
          rules={[
            {
              required: true,
              message: "Please input your Rapyd Access Token!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your Rapyd Access Token" />
        </Form.Item>
        <div className="float-right my-3">
          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-400 active:bg-blue-600 font-bold transition duration-150 ease-in-out uppercase">
            Create Store
          </button>
        </div>
      </Form>
    </div>
  );
}
