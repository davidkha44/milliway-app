import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Generator.module.css";

import { RootState } from "../store/store";

import { layer1Data } from "../assets/data/Layer1Data";
import { layer2Data } from "../assets/data/Layer2Data";
import { maleMouthLayer, femaleMouthLayer } from "../assets/data/Layer3Data";
import { maleHairLayer, femaleHairLayer } from "../assets/data/Layer4Data";
import {
  femaleClothesLayer,
  maleClothesLayer,
} from "../assets/data/Layer5Data";
import { layer6Data } from "../assets/data/Layer6Data";

import watermark from "../assets/images/layers/layer-07-domain.png";
import randomizeBtn from "../assets/images/buttons/randomize-button.svg";
import { setSeed } from "../store/reducers";

interface Props {
  setRefresh: Dispatch<SetStateAction<number>>;
}

const Generator = ({ setRefresh }: Props) => {
  const dispatch = useDispatch();

  const row2Index = useSelector((state: RootState) => state.row2);
  const row3Index = useSelector((state: RootState) => state.row3);
  const gender = useSelector((state: RootState) => state.gender);
  const seed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const [bgSource, setBgSource] = useState("");
  const [bgAlt, setBgAlt] = useState("");

  const [skinSource, setSkinSource] = useState("");
  const [skinAlt, setSkinAlt] = useState("");

  const [mouthSource, setMouthSource] = useState("");
  const [mouthAlt, setMouthAlt] = useState("");

  const [hairSource, setHairSource] = useState("");
  const [hairAlt, setHairAlt] = useState("");

  const [clothesSource, setClothesSource] = useState("");
  const [clothesAlt, setClothesAlt] = useState("");

  const [accessoireSource, setAccessoireSource] = useState("");
  const [accessoireAlt, setAccessoireAlt] = useState("");

  const layer3Data = gender === "male" ? maleMouthLayer : femaleMouthLayer;
  const layer4Data = gender === "male" ? maleHairLayer : femaleHairLayer;
  const layer5Data = gender === "male" ? maleClothesLayer : femaleClothesLayer;

  let clothesIndex = row2Index[4] === 3 ? 0 : row3Index[1];
  let accessoireIndex =
    row2Index[5] === 1 ||
    row2Index[5] === 3 ||
    row2Index[5] === 4 ||
    row2Index[5] === 5
      ? 0
      : row3Index[2];
  useEffect(() => {
    seed[0] = gender === "male" ? 0 : 1;

    setBgSource(layer1Data[row2Index[0]].source);
    setBgAlt(layer1Data[row2Index[0]].alt);
    seed[1] = row2Index[0];

    setSkinSource(layer2Data[row2Index[1]].source);
    setSkinAlt(layer2Data[row2Index[1]].alt);
    seed[2] = row2Index[1];

    setMouthSource(layer3Data[row2Index[2]].source);
    setMouthAlt(layer3Data[row2Index[2]].alt);
    seed[3] = row2Index[2];

    setHairSource(layer4Data[row2Index[3]][row3Index[0]].source);
    setHairAlt(layer4Data[row2Index[3]][row3Index[0]].alt);
    seed[4] = row2Index[3];
    seed[5] = row3Index[0];

    setClothesSource(layer5Data[row2Index[4]][clothesIndex].source);
    setClothesAlt(layer5Data[row2Index[4]][clothesIndex].alt);
    seed[6] = row2Index[4];
    seed[7] = clothesIndex;

    setAccessoireSource(layer6Data[row2Index[5]][accessoireIndex].source);
    setAccessoireAlt(layer6Data[row2Index[5]][accessoireIndex].alt);
    seed[8] = row2Index[5];
    seed[9] = accessoireIndex;

    dispatch(setSeed(seed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row2Index, row3Index]);

  return (
    <div className={`${styles.container} ${styles.dimension}`}>
      <img
        src={bgSource}
        alt={bgAlt}
        className={`${styles.overlay} ${styles.dimension}`}
      />
      <img
        src={skinSource}
        alt={skinAlt}
        className={`${styles.overlay} ${styles.dimension}`}
      />
      <img
        src={mouthSource}
        alt={mouthAlt}
        className={`${styles.overlay} ${styles.dimension}`}
      />
      <img
        src={hairSource}
        alt={hairAlt}
        className={`${styles.overlay} ${styles.dimension}`}
      />
      <img
        src={clothesSource}
        alt={clothesAlt}
        className={`${styles.overlay} ${styles.dimension}`}
      />
      <img
        src={accessoireSource}
        alt={accessoireAlt}
        className={`${styles.overlay} ${styles.dimension}`}
      />
      <img
        src={watermark}
        alt="watermark"
        className={`${styles.overlay} ${styles.dimension}`}
      />
      <img
        src={randomizeBtn}
        alt="randomize button"
        className={styles.randomBtn}
        onClick={() => setRefresh((val) => (val += 1))}
      />
    </div>
  );
};

export default Generator;
