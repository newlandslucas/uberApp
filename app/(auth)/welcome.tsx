import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image} from "react-native";
import Swiper from "react-native-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import { welcome } from "../../constants/index"; // Certifique-se de que o caminho está correto
import CustomButton from "../../components/customButton";

const Welcome = () => {
    const swiperRef = useRef<Swiper>(null);
    const [index, setActiveIndex] = useState(0);
    const isLastSlide = index === welcome.length - 1;

    return (
        <SafeAreaView className="flex h-full items-center justify-between bg-white">
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(auth/sign-up)");
                }}
                className="w-full flex justify-end items-end p-5"
            >
                <Text className="text-black text-mf font-bold">Skip</Text>
            </TouchableOpacity>
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
                activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {welcome && welcome.map((item, idx) => (
                    <View key={item.id} className="flex items-center justify-center p-5">
                    <Image
                        source={item.image}
                        className="w-full h-[300px]"
                        resizeMode="contain"
                    />
                    <View className="flex flex-row items-center justify-center w-full mt-10">
                        <Text className="text-black text-3xl font-bold mx-10 text-center">
                        {item.title}
                        </Text>
                    </View>
                    <Text className="text-lg font-semibold text-center text-[#858585] mx-10 mt-3">
                        {item.description}
                    </Text>
                    </View>
                ))}
            </Swiper>

            <CustomButton 
                title={isLastSlide ? "getStarted" : "Next"}
                onPress={() => isLastSlide ? router.replace("/(auth/sign-up)") : swiperRef.current?.scrollBy(1)}
                className="w-11/12 mt-10 mb-5"
                bgVariant="primary"
            />
        </SafeAreaView>
    );
};

export default Welcome;