import axios from "axios";

export default {
  // Gets all books
  getJobs: function() {
    return axios.get("/api/jobs");
  },
  // Gets the book with the given id
  getJob: function(id) {
    return axios.get("/api/jobs/" + id);
  },
  // Deletes the book with the given id
  deleteJob: function(id) {
    return axios.delete("/api/jobs/" + id);
  },
  // Saves a book to the database
  saveJob: function(jobData) {
    return axios.post("/api/jobs", jobData);
  }, // Get education data from server API
  getEducation: function(educationData) {
    return axios.get("/api/education", educationData);
  }
};
