import { Box, HStack } from "@chakra-ui/react";
import SparkLineChart from "./SparkLineChart";
import ColorMappingChart from "./ColorMappingChart";

function ChartsReports() {
  return (
    <HStack justify={"space-around"} align={"center"} wrap={"wrap"}>
    <SparkLineChart />
    <ColorMappingChart />
    </HStack>
  );
}

export default ChartsReports;
