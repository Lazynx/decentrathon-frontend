import React from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import Layout from "./Layout"; 

const Market = () => {
  return (
    <Layout> 
      <section className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Market Section</h1>
        <p className="text-lg md:text-2xl">
          Добро пожаловать в раздел Market! Здесь вы можете найти различные курсы и материалы для изучения.
        </p>
        <TonConnectButton className="mt-4" />
      </section>
    </Layout>
  );
};

export default Market;