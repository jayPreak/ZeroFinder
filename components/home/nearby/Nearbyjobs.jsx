import React from "react";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import styles from "./nearbyjobs.style";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import {
  images,
  icons,
  COLORS,
  FONT,
  SIZES,
  SHADOWS
} from "../../../constants";
import { useRouter } from "expo-router";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "React Developer",
    page: 1,
    num_pages: 1
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
