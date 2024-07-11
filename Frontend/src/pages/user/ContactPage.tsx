import React, { ChangeEvent, FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import aboutimg from '../../assets/images/heartt.png';
import Footer from '../../components/user/Footer/Footer';
import Navbar from '../../components/user/Navbar/navbar';


interface FormData {
  name: string;
  mobilenumber: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  mobilenumber?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobilenumber: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [msg, setMsg] = useState<string>(''); // State to hold success or error messages
  const [msgType, setMsgType] = useState<'success' | 'error' | ''>(''); // State to hold message type
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to handle loading indicator

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = (): boolean => {
    const { name, mobilenumber, email, subject, message } = formData;
    let formErrors: FormErrors = {};
    let isValid = true;

    if (!name.trim()) {
      isValid = false;
      formErrors.name = 'Name must be filled out';
    } else if (!/^[a-zA-Z.\s]+$/.test(name)) {
      isValid = false;
      formErrors.name = 'Name must contain only alphabets and dot';
    }

    if (!mobilenumber.trim()) {
      isValid = false;
      formErrors.mobilenumber = 'Mobile Number must be filled out';
    } else if (isNaN(Number(mobilenumber))) {
      isValid = false;
      formErrors.mobilenumber = 'Mobile Number must be Digits';
    } else if (mobilenumber.length !== 10) {
      isValid = false;
      formErrors.mobilenumber = 'Mobile Number must have exactly 10 digits';
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      isValid = false;
      formErrors.email = 'Email must be a valid email address';
    }

    if (!subject.trim()) {
      isValid = false;
      formErrors.subject = 'Subject must be filled out';
    }

    if (!message.trim()) {
      isValid = false;
      formErrors.message = 'Message must be filled out';
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // Show loading indicator
      // Your EmailJS service ID, template ID, and Public Key
      const serviceId = 'service_lgpplhd'; // YOUR_SERVICE_ID
      const templateId = 'template_s6nlrda'; // YOUR_TEMPLATE_ID
      const publicKey = 'I4-nfHaoEQNzDIzFa'; // YOUR_PUBLIC_KEY

      // Destructure formData for EmailJS templateParams
      const { name, email, mobilenumber, subject, message } = formData;

      // Create a new object that contains dynamic template params
      const templateParams = {
        name: name,
        email: email,
        mobilenumber: mobilenumber,
        subject: subject,
        message: message,
      };

      // Send the email using EmailJS
      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('Email sent successfully!', response);
          setMsgType('success');
          setMsg('Message sent successfully!');
          
          setFormData({
            name: '',
            mobilenumber: '',
            email: '',
            subject: '',
            message: '',
          });
          setErrors({});
          setTimeout(() => {
            setMsg('');
            setMsgType('');
            
          }, 3000); // Clear the message after 3 seconds
          setIsLoading(false); // Hide loading indicator
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          setMsgType('error');
          setMsg('Failed to send message. Please try again.');
          setTimeout(() => {
            setMsg('');
            setMsgType('');
            
          }, 3000); // Clear the message after 3 seconds
          setIsLoading(false); // Hide loading indicator
        });
    }
  };

  return (
    <>
      <div className="border-t-3 mt-4"></div>
      <section id="contact" className="contact py-8">
        <div className="container mx-auto px-4">
          <div className="section-title text-center">
            <h2 className="text-3xl font-semibold">Contact Us</h2>
          </div>
          <br />
          <div className="flex flex-wrap" data-aos="fade-in">
            <div className="w-full lg:w-5/12 flex items-stretch">
              <div className="info">
                <div className="email mb-4">
                  <i className="bi bi-envelope text-2xl"></i>
                  <h4 className="text-lg font-bold">Email:</h4>
                  <p>quickdoc@gmail.com</p>
                </div>
                <div className="phone">
                  <i className="bi bi-phone text-2xl"></i>
                  <h4 className="text-lg font-bold">Call:</h4>
                  <p>+91 9074462392</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-7/12 mt-5 lg:mt-0 flex items-stretch">
              <form id="form" method="post" role="form" className="php-email-form w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      className={`form-control form-color w-full p-2 border border-gray-300 rounded-md ${errors.name && 'is-invalid'}`}
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      
                    />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="mobilenumber"
                      className={`form-control form-color w-full p-2 border border-gray-300 rounded-md ${errors.mobilenumber && 'is-invalid'}`}
                      placeholder="Mobile"
                      value={formData.mobilenumber}
                      onChange={handleInputChange}
                      
                    />
                    {errors.mobilenumber && <span className="text-red-500">{errors.mobilenumber}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      className={`form-control form-color w-full p-2 border border-gray-300 rounded-md ${errors.email && 'is-invalid'}`}
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="subject"
                      className={`form-control form-color w-full p-2 border border-gray-300 rounded-md ${errors.subject && 'is-invalid'}`}
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      
                    />
                    {errors.subject && <span className="text-red-500">{errors.subject}</span>}
                  </div>
                  <div className="form-group">
                    <textarea
                      id="message"
                      className={`form-control form-color w-full p-2 border border-gray-300 rounded-md ${errors.message && 'is-invalid'}`}
                      rows={5}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      
                    ></textarea>
                    {errors.message && <span className="text-red-500">{errors.message}</span>}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="button button-a button-big button-rounded form-color m-4 bg-green-700 hover:bg-green-600 text-white p-2 rounded-md"
                      
                    >
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                  {msg && (
                    <div className={`errmsg ${msgType === 'success' ? 'text-green-500 text-xl' : 'text-red-500 text-xl '}`}>
                      <span>{msg}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      

      <div className="w-full min-h-[80vh] flex flex-col md:flex-row justify-center items-center bg-gray-200 pt-4  md:pt-0">
  <div className="w-full md:w-3/4 lg:w-1/2  flex flex-col justify-center items-center bg-gray-200">
    <div className="max-w-max lg:pl-20 lg:ml-20 bg-gray-200">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-8 px-4 md:pl-8">Contact QuickDoc</h1>
      <h2 className="text-2xl md:text-2xl lg:text-2xl font-semibold text-gray-900 mb-4 px-4 md:pl-8 md:mb-4 ">
      Help us enable the best healthcare experience in India.
      </h2>
    </div>
  </div>
  <div className="w-full md:w-1/2 h-auto flex justify-center items-center p-4 md:pl-20 bg-gray-200">
    <img
      src={aboutimg}
      alt="About img"
      className="w-full h-auto sm:w-3/4 md:w-3/4 lg:w-4/5 xl:w-11/12 2xl:w-10/12"
    />
  </div>
</div>

      
      <ContactSection />
      <Footer />
    </>
  );
};

export default AboutPage;
