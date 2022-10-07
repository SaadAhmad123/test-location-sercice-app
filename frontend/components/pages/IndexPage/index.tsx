import React from "react";
import Layout from "../../Layout";
import Container from "../../Container";
import Separator from "../../Separator";
import SearchBar from "../../Inputs/SearchBar";
import ThemedImage from "../../ThemedImage";
import UseLocationButton from "./Buttons/UseLocation";
import SearchButton from "./Buttons/Search";
import useIndexPage from "./hooks/useIndexPage";

const IndexPage = () => {
  const {
    error,
    address,
    loading,
    handleOnSearchChange,
    handleOnSearch,
    handleOnClickCurrentLocation,
  } = useIndexPage();

  return (
    <Layout nav={false}>
      <Container className="flex md:items-center justify-center min-h-screen bg-no-repeat bg-cover">
        <div className="md:rounded w-screen md:w-[500px] xl:w-[600px] p-6 py-16 md:p-8 bg-white">
          <h1 className="w-full text-4xl font-bold text-gray-700 text-center">
            GeoHash
          </h1>
          <Separator />
          <p className={"text-gray-500 text-center"}>
            This is a test project that I have developed to implement GeoHash
            for location search services.
          </p>
          <Separator padding={8} />
          <div className="flex justify-center">
            <div className="md:w-[500px]">
              <ThemedImage src={require("../../../assets/world.svg")} />
            </div>
          </div>
          <Separator padding={8} />
          <p className={`py-2 text-center text-red-400 text-sm`}>{error}</p>
          <SearchBar
            value={address}
            onChange={handleOnSearchChange}
            placeholder={"Enter your address..."}
          />
          <Separator padding={8} />
          <div className={"justify-center flex"}>
            <UseLocationButton
              onClick={handleOnClickCurrentLocation}
              loading={loading.currentAddress}
            />
            <Separator horizontal />
            <SearchButton onClick={handleOnSearch} loading={loading.search} />
          </div>
          <Separator padding={8} />
          <div className="flex items-center justify-center">
            <p className="text-gray-500 cursor-pointer hover:underline">
              Create a location
            </p>
          </div>
          <Separator padding={20} />
          <p className="text-sm text-gray-400 text-center font-light">
            Created by Saad Ahmad. The application code, architecture and
            documentation can be found on{" "}
            <a
              className="underline hover:text-gray-800"
              href="https://github.com/SaadAhmad123/test-location-sercice-app"
              target={"_block"}
            >
              github
            </a>
            .
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
