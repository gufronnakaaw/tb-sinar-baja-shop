import Layout from "@/components/Layout";
import { Button } from "@nextui-org/react";

export default function HomePage() {
  return (
    <Layout>
      <Button color="success" className="font-semibold capitalize">
        click me
      </Button>
    </Layout>
  );
}
