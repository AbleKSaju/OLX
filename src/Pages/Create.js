import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';

const CreatePage = ({AddProduct}) => {

  return (
    <Fragment>
      <Header />
      <Create AddProduct={AddProduct}/>
    </Fragment>
  );
};

export default CreatePage;
