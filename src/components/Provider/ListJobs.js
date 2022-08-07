import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DatabaseContext";
import { ListJob } from "./ListJob";

export const ListJobsProvider = () => {
  const [jobs, setJobs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { userData } = useAuth();
  const { db } = useDatabase();
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setJobs([]);
      const jobsRef = collection(db, "job");
      const q = query(
        jobsRef,
        where("skills", "array-contains-any", userData.skills)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setJobs((prev) => [doc.data(), ...prev]);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyJob = async (jobId) => {
    try {
      const currentJob = jobs && jobs.find((j) => j.jobId === jobId);
      if (!currentJob) {
        throw new Error();
      }
      const jobRef = doc(db, "job", jobId);
      if (currentJob.provider) {
        await updateDoc(jobRef, {
          appliedProviders: [userData, ...currentJob.provider],
        });
      } else {
        await updateDoc(jobRef, {
          appliedProviders: [userData],
        });
      }
      fetchJobs();
    } catch (err) {
      console.log("THE RR", err);
    } finally {
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <h1>Available Jobs</h1>
      {jobs.length <= 0 ? (
        <h2>No jobs available. </h2>
      ) : (
        jobs.map((j, i) => <ListJob key={i} job={j} applyJob={applyJob} />)
      )}
    </>
  );
};
