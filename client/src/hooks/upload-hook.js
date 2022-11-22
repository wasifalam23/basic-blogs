import { useState, useEffect, useRef } from 'react';

const useUpload = () => {
  const [imgFile, setImgFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [inputKey, setInputKey] = useState('');

  const imgFilePickedRef = useRef();

  useEffect(() => {
    if (!imgFile) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(imgFile);
  }, [imgFile]);

  const imgPickedHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      const pickedFile = e.target.files[0];
      setImgFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const pickImgHandler = () => {
    imgFilePickedRef.current.click();
  };

  const resetFile = () => {
    setPreviewUrl();
    setImgFile();
    const randomKey = Math.random().toString(32);
    setInputKey(randomKey);
  };

  return {
    imgFile,
    previewUrl,
    setPreviewUrl,
    imgFilePickedRef,
    imgFileIsValid: isValid,
    imgPickedHandler,
    pickImgHandler,
    resetImgFile: resetFile,
    inputKey,
  };
};

export default useUpload;
