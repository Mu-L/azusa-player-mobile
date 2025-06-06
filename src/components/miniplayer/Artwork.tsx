import { TouchableWithoutFeedback, Dimensions, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Image, useImage } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTrackStore } from '@hooks/useActiveTrack';
import { MinPlayerHeight } from './Constants';
import { useNoxSetting } from '@stores/useApp';
import { songResolveArtwork } from '@utils/mediafetch/resolveURL';
import logger from '@utils/Logger';
import HorizontalCarousel from '@components/commonui/HorizontalCarousel';
import { performSkipToNext, performSkipToPrevious } from '@hooks/useTPControls';
import { playNextSong } from '@stores/playingList';
import { styles } from '../style';

interface Props extends NoxComponent.MiniplayerProps {
  opacity: SharedValue<number>;
  onPress: () => void;
  expand: () => void;
}

export default ({ miniplayerHeight, opacity, onPress, expand }: Props) => {
  const track = useTrackStore(s => s.track);
  const [trackCarousel, setTrackCarousel] = useState<any[]>([]);
  const playerSetting = useNoxSetting(state => state.playerSetting);
  const [overwriteAlbumArt, setOverwriteAlbumArt] = useState<string | void>();
  const { width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  const imgURI = playerSetting.hideCoverInMobile
    ? ''
    : `${overwriteAlbumArt ?? track?.artwork}`;
  const img = useImage(imgURI, {
    maxHeight:
      playerSetting.artworkRes === 0 ? undefined : playerSetting.artworkRes,
    maxWidth:
      playerSetting.artworkRes === 0 ? undefined : playerSetting.artworkRes,
    onError: () =>
      logger.warn(`[artwork] failed to load ${track?.mediaId} artwork`),
  });

  const artworkWidth = useDerivedValue(() => {
    return Math.min(miniplayerHeight.value - 15, width);
  });

  const artworkScale = useDerivedValue(() => {
    return artworkWidth.value / width;
  });
  const expandDiff = useDerivedValue(
    () => miniplayerHeight.value - MinPlayerHeight,
  );

  const artworkTranslateY = useDerivedValue(() => {
    return Math.min(95, 30 + (expandDiff.value - width - insets.top) / 2);
  });
  const artworkTranslateX = useDerivedValue(() => {
    const halfTranslation = (artworkWidth.value - width) / 2;
    if (expandDiff.value < 6) {
      return 5 - expandDiff.value + halfTranslation;
    }
    return halfTranslation;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: artworkTranslateX.value },
        { translateY: artworkTranslateY.value },
        { scale: artworkScale.value },
      ],
      opacity: opacity.value,
      zIndex: opacity.value > 0 ? 1 : -1,
    };
  });

  const onImagePress = () => {
    if (miniplayerHeight.value === MinPlayerHeight) {
      return expand();
    }
    if (artworkScale.value === 1) {
      return onPress();
    }
  };

  const refreshImageCarousel = () =>
    setTrackCarousel([
      { uri: playNextSong(-1, false)?.cover },
      img,
      { uri: playNextSong(1, false)?.cover },
    ]);

  useEffect(() => {
    songResolveArtwork(track?.song)?.then(setOverwriteAlbumArt);
  }, [track]);

  useEffect(() => refreshImageCarousel(), [img]);

  return (
    <TouchableWithoutFeedback onPress={onImagePress}>
      <Animated.View
        style={[
          {
            width,
            height: width + insets.top,
            position: 'absolute',
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
      >
        <View style={{ height: insets.top }} />
        {playerSetting.artworkCarousel ? (
          <HorizontalCarousel
            images={trackCarousel}
            imgStyle={{ width, height: width }}
            paddingVertical={100}
            callback={i =>
              i === -1 ? performSkipToNext() : performSkipToPrevious()
            }
            active={track !== undefined}
          />
        ) : (
          !playerSetting.hideCoverInMobile && (
            <Image style={styles.flex} source={img} />
          )
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
