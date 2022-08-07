import { getAuth } from "@firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DatabaseContext";

export const ViewJobProvider = () => {
  const { jobId } = useParams();
  const [job, setJob] = React.useState();
  const { db } = useDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = getAuth();
  const { userData } = useAuth();

  const isDisabled =
    job && job.appliedProviders.find((p) => p.userId === currentUser.uid);

  React.useEffect(() => {
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
    fetchJobInfo();
  }, []);

  const applyJob = async () => {
    try {
      const jobRef = doc(db, "job", jobId);
      if (job.provider) {
        await updateDoc(jobRef, {
          appliedProviders: [userData, ...job.provider],
        });
      } else {
        await updateDoc(jobRef, {
          appliedProviders: [userData],
        });
      }
    } catch (err) {
      console.log("THE RR", err);
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
          {/* TODO: Add and showcase job info data from the `job object`*/}
          <Button onClick={applyJob} disabled={isDisabled}>
            {isDisabled ? "Already applied" : "Apply Now"}
          </Button>
        </>
      )}
    </>
  );
};
