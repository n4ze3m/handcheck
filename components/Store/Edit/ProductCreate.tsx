import { Form, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductCreate() {

  const router = useRouter()
  const onFinish = async (value:any) => {
    const store_id = router.query.id;
    const data = {
      ...value,
      price: Number(value.price),
      store_id
    }
    await axios.post("/api/store/product/create", data)
    router.replace(router.asPath);
  }
 
  return (
    <div>
      <h2 className="text-xl mb-4">Create a new product</h2>
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        wrapperCol={{ span: 16 }}
        layout="vertical"
        // preserve={false} 
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input your product name!" },
          ]}
        >
          <Input placeholder="Enter your product name" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Product Image"
          rules={[
            { required: true, message: "Please input your product image!" },
          ]}
        >
          <Input placeholder="Enter your product image" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please input your product price!" },
          ]}
        >
          <Input placeholder="Enter your product price" type={"number"} />
        </Form.Item>
        <Form.Item>
          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-400 active:bg-blue-600 font-bold transition duration-150 ease-in-out uppercase">
            Create Product
          </button>
      </Form.Item>
      </Form>
    </div>
  );
}
