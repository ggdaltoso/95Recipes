import React, { useEffect, useState, useRef } from "react";

import { Frame, Tooltip } from "@react95/core";
import { useSelector } from "react-redux";

import styled from "@xstyled/styled-components";

const StyledTooltip = styled(Tooltip)`
  div:first-child {
    right: 0;
  }
`;

const Clock = () => {
  const [timer, setTimer] = useState("");
  const [tooltipText, setTooltipText] = useState(undefined);
  const tipRef = useRef(null);

  useEffect(() => {
    function checkTime(i) {
      return i < 10 ? `0${i}` : i;
    }

    const interval = setInterval(() => {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      setTimer(`${checkTime(h)}:${checkTime(m)}`);
    });

    return () => clearInterval(interval);
  });

  const isServiceWorkerInitialized = useSelector(
    state => state.serviceWorkerInitialized
  );
  const isServiceWorkerUpdated = useSelector(
    state => state.serviceWorkerUpdated
  );
  const serviceWorkerRegistration = useSelector(
    state => state.serviceWorkerRegistration
  );

  function updateTolltip(text) {
    setTooltipText(text);
    const mouseOver = new MouseEvent("mouseover", { bubbles: true });
    tipRef.current.dispatchEvent(mouseOver);
  }

  useEffect(() => {
    if (isServiceWorkerInitialized) {
      updateTolltip("Page has been saved for offline use.");
    }
  }, [isServiceWorkerInitialized]);

  useEffect(() => {
    if (isServiceWorkerUpdated) {
      updateTolltip("New version available! Click here to update");
    }
  }, [isServiceWorkerUpdated]);

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: "SKIP_WAITING" });

      registrationWaiting.addEventListener("statechange", e => {
        if (e.target.state === "activated") {
          window.location.reload();
        }
      });
    }
  };

  return (
    <Frame
      boxShadow="in"
      bg="transparent"
      px={6}
      py={2}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <StyledTooltip
        ref={tipRef}
        text={tooltipText}
        onClick={() => {
          if (isServiceWorkerUpdated) {
            updateServiceWorker();
          }
        }}
      >
        {timer}
      </StyledTooltip>
    </Frame>
  );
};

export default Clock;
