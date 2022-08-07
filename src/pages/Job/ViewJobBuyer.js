import { getAuth } from "@firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DatabaseContext";

export const ViewJobBuyer = () => {
  const { jobId } = useParams();
  const [job, setJob] = React.useState();
  const { db } = useDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const { currentUser } = getAuth();
  const { userData } = useAuth();

  const fetchJobInfo = async () => {
    try {
      const q = query(collection(db, "job"), where("jobId", "==", jobId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setJob(doc.data());
      });
    } catch (err) {
      // Display proper error messages
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (job && job.appliedProviders)
      setIsDisabled(
        job.appliedProviders.find((p) => p.userId === currentUser.uid)
      );
  }, [job]);

  React.useEffect(() => {
    fetchJobInfo();
  }, []);

  const deleteJob = async () => {
    try {
      await deleteDoc(doc(db, "job", jobId));
      navigate("/dashboard");
    } catch (err) {
    } finally {
    }
  };
  return (
    <>
      <h1>View Job</h1>
      {isLoading ? (
        <h1>Loading </h1>
      ) : (
        <>
          {/* TODO: Add and showcase job info data  from the `job object`*/}
          {/* TODO: SHOW APPLIED PROVIDERS INFO IN BRIEF HERE */}
          <h3>{job.jobTitle}</h3>
          <h1>Applied Providers</h1>
          {job.appliedProviders
            ? job.appliedProviders.map((jp) => (
                <>
                  <h1>{jp.firstName}</h1>
                  <Button onClick={deleteJob}>Hire</Button>
                </>
              ))
            : "No one has applied to your job post so far"}
        </>
      )}
    </>
  );
};
