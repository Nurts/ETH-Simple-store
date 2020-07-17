import Form from 'react-bootstrap/Form';
import React,{Component} from 'react'; 
  
export default class SelectImage extends Component { 
   
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null
    }; 
    

    getImage = () => {
      return this.state.selectedFile;
    }
    
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] });
     
    }; 

    
     
    // On file upload (click the upload button) 
    // onFileUpload = () => { 
     
    //   // Create an object of formData 
    //   const formData = new FormData(); 
     
    //   // Update the formData object 
    //   formData.append( 
    //     "myFile", 
    //     this.state.selectedFile, 
    //     this.state.selectedFile.name 
    //   ); 
     
    //   // Details of the uploaded file 
    //   console.log(this.state.selectedFile); 
     
    //   // Request made to the backend api 
    //   // Send formData object
    // }; 
     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
      if (this.state.selectedFile) { 
        return (
            <p>{this.state.selectedFile.name}</p>     
        ); 
      } else { 
        return "Choose File";
      } 
    }; 
     
    render() { 
     
      return ( 
        <Form.File id="formcheck-api-custom" custom style = {{width: "30rem", margin : '10px'}}>
          <Form.File.Input isValid onChange = {this.onFileChange} />
            <Form.File.Label data-browse="Select Image" style = {{textAlign: "left"}}>
                {this.fileData()}
            </Form.File.Label>
        </Form.File>
      ); 
    } 
  } 