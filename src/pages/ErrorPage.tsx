import { Button } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>Back home</Button>
    </div>
  );
}