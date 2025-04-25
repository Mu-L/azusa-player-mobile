import React, { useState, useEffect } from 'react';
import { Text, Menu } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useProgress } from 'react-native-track-player';
import { RangeSlider } from '@react-native-assets/slider';
import { StyleSheet, View } from 'react-native';

import { useNoxSetting } from '@stores/useApp';
import GenericDialog from '@components/dialogs/GenericDialog';
import { seconds2MMSS as formatSeconds } from '@utils/Utils';
import { addABRepeat } from '@stores/appStore';

interface Props {
  closeMenu?: () => void;
  song: NoxMedia.Song;
}

interface SliderProps {
  range: [number, number];
  setRange: (range: [number, number]) => void;
}

const ABSlider = ({ range, setRange }: SliderProps) => {
  const { duration } = useProgress(1000, false);
  const playerStyle = useNoxSetting(state => state.playerStyle);
  const currentABRepeat = useNoxSetting(state => state.currentABRepeat);

  useEffect(() => setRange(currentABRepeat), [currentABRepeat]);

  return (
    <View>
      <View style={styles.labelSpacer} />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>
          {formatSeconds(duration * range[0])}
        </Text>
        <Text style={styles.labelText}>
          {formatSeconds(duration * range[1])}
        </Text>
      </View>
      <View style={styles.labelSpacer} />
      <RangeSlider
        range={currentABRepeat}
        thumbTintColor={playerStyle.colors.tertiary}
        onValueChange={setRange}
        outboundColor={playerStyle.colors.secondaryContainer}
        inboundColor={playerStyle.colors.primary}
        maximumValue={1}
      />
    </View>
  );
};

const ABSliderMenu = ({ song, closeMenu }: Props) => {
  const { t } = useTranslation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const setCurrentABRepeat = useNoxSetting(state => state.setCurrentABRepeat);
  const [range, setRange] = useState<[number, number]>([0, 1]);

  const onSubmit = () => {
    if (closeMenu) closeMenu();
    setDialogVisible(val => !val);
    setCurrentABRepeat(range);
    addABRepeat(song, range);
  };

  return (
    <>
      <Menu.Item
        leadingIcon={'ab-testing'}
        title={t('SongOperations.abrepeat')}
        onPress={() => setDialogVisible(true)}
      />
      <GenericDialog
        visible={dialogVisible}
        title={t('SongOperations.abrepeat')}
        onClose={() => setDialogVisible(val => !val)}
        onSubmit={onSubmit}
      >
        <ABSlider range={range} setRange={setRange} />
      </GenericDialog>
    </>
  );
};

export default ABSliderMenu;

const styles = StyleSheet.create({
  liveContainer: {
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
  liveText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
  },
  container: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  labelSpacer: {
    height: 10,
  },
  labelText: {
    fontVariant: ['tabular-nums'],
  },
});
