import NoDataImage from '../../../assets/Images/No-data-image.svg';



const NoData = () => {
  return (
    <div>
      <img width={300} src={NoDataImage} alt="No Data Image" />
      <h4>No Data Found</h4>
    </div>
  )
};

export default NoData;
