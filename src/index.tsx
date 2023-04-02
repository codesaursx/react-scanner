import React, { useCallback, useEffect, useRef } from 'react';
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
  Result,
} from '@zxing/library';
import Webcam from 'react-webcam';

type ScannerProps = {
  onUpdate: (error: unknown, data?: Result) => void;
  onError?: (error: string | DOMException) => void;
  width?: number | string;
  height?: number | string;
  facingMode?: 'environment' | 'user';
  torch?: boolean;
  delay?: number;
  videoConstraints?: MediaTrackConstraints;
  stopStream?: boolean;
};

export const Scanner = ({
  onUpdate,
  onError,
  width = '100%',
  height = '100%',
  facingMode = 'environment',
  delay = 500,
  videoConstraints,
}: ScannerProps) => {
  const webcamRef = useRef(null);

  const handleCapture = useCallback(() => {
    const hints = new Map();
    const formats = [
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.EAN_8,
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_39,
      BarcodeFormat.CODE_128,
      BarcodeFormat.ITF,
      BarcodeFormat.RSS_14,
      BarcodeFormat.QR_CODE,
      BarcodeFormat.DATA_MATRIX,
      BarcodeFormat.AZTEC,
      BarcodeFormat.PDF_417,
    ];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

    const reader = new BrowserMultiFormatReader(hints);
    // @ts-ignore
    const imageSrc = webcamRef?.current?.getScreenshot();
    if (imageSrc) {
      reader
        .decodeFromImage(undefined, imageSrc)
        .then(res => onUpdate(null, res))
        .catch(e => onUpdate(e));
    }
  }, [onUpdate]);

  useEffect(() => {
    const interval = setInterval(handleCapture, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Webcam
      width={width}
      height={height}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints ?? { facingMode }}
      audio={false}
      onUserMediaError={onError}
    />
  );
};
