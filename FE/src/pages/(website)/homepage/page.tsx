import { useUserContext } from "@/common/context/UserProvider";
import React from "react";
import ChatPopup from "../chatpopup/page";
import Collections from "./_componnents/Collections";
import FeatureCards from "./_componnents/FeatureCards";
import NewArrivals from "./_componnents/NewArrivals";
import OurSeries from "./_componnents/OurSeries";
import Slider from "./_componnents/Slider";
import SubscribeSection from "./_componnents/SubscribeSection";
import { InfoTest } from "@/components/InfoTest";

const HomePageNew = () => {
  React.useEffect(() => {
    document.title = "FabricFocus"; // Đặt tiêu đề cho trang
  }, []);

  const { _id } = useUserContext();

  return (
    <div className="bg-zinc-100">
      <main className="bg-white  lg:mx-[50px] mx-[14px] ">
        <Slider />
        <Collections />
        {/* <SpecialOffers /> */}
        <NewArrivals />
        <OurSeries />
        {/* <Accessories /> */}
        <FeatureCards />
        <SubscribeSection />
        {/* Chat */}
        {_id && <ChatPopup />}
        <InfoTest />
      </main>
    </div>
  );
};

export default HomePageNew;
