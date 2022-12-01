const sampleObj = {
  applicant_details: {
    basic_details: {
      dob: "6-undefined-1985",
      name: "MANGALABATI PUJARI",
      tags: {
        fathers_name: null,
        marital_status: "Married",
      },
      gender: "M",
      aadhar_number: "331081000000",
    },
    permanent_correspondence_details: {
      address: null,
      contact: {
        phone: "7854875051",
      },
    },
    temporary_correspondence_details: {
      address: null,
      contact: {
        phone: "7854875051",
      },
    },
  },
  application_basic_info: {
    district: "363",
  },
};

export const parseAPIData = (sampleObj) => {
  const parsedForm = {};
  parsedForm["dob"] = sampleObj.applicant_details.basic_details.dob;
  parsedForm["name"] = sampleObj.applicant_details.basic_details.name;
  parsedForm["fathers_name"] =
    sampleObj.applicant_details.basic_details.tags.fathers_name;
  parsedForm["marital_status"] =
    sampleObj.applicant_details.basic_details.tags.marital_status;
  parsedForm["address"] =
    sampleObj.applicant_details.permanent_correspondence_details.address;
  parsedForm["phone"] =
    sampleObj.applicant_details.permanent_correspondence_details.contact.phone;
  parsedForm["district"] = sampleObj.application_basic_info.district;
  parsedForm["gender"] = sampleObj.applicant_details.basic_details.gender;
  parsedForm["aadhar_number"] =
    sampleObj.applicant_details.basic_details.aadhar_number;

  return parsedForm;
};
