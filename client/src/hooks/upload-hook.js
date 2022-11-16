import { useState, useEffect, useRef } from 'react';

const useUpload = () => {
  const [imgFile, setImgFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

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
    let pickedFile;

    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
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
  };
};

export default useUpload;
