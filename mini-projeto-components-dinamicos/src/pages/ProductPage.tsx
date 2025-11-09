import Form from "../components/Form";
import useFormLogic from "../hook/useFormLogic";

function ProductPage() {

  const {fields, Category, handleSubmit, handleChange, formProduct, fielfile} = useFormLogic();

  return (
    
    <div className="w-56">
      <Form  
        fields={fields}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        Category={Category}
        formProduct={formProduct}
        fielfile={fielfile}
      />
    </div>

  )
}

export default ProductPage