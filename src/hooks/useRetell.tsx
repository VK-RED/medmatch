'use client'

import { agentId,llmUrl } from "@/lib/config";
import { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";


interface RegisterCallResponse {
  callId?: string;
  sampleRate: number;
}

export const useRetell = () => {
    
  const [isCalling, setIsCalling] = useState(false);
  const [webClient,setWebClient] = useState<RetellWebClient|null>(null);

  // Initialize the SDK
  useEffect(() => {
    const wClient = new RetellWebClient();

    // Setup event listeners
    wClient.on("conversationStarted", () => {
      console.log("conversationStarted");
    });

    wClient.on("audio", (audio: Uint8Array) => {
      console.log("There is audio");
    });

    wClient.on("conversationEnded", ({ code, reason }) => {
      console.log("Closed with code:", code, ", reason:", reason);
      setIsCalling(false); // Update button to "Start" registerCallResponsewhen conversation ends
    });

    wClient.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false); // Update button to "Start" in case of error
    });

    wClient.on("update", (update) => {
      // Print live transcript as needed
      console.log("update", update);
    });

    setWebClient((p)=>wClient);
  }, []);

  useEffect(()=>{
    if(webClient){
      console.log("Retell Client Initialized !!, Starting the Interview");
      startConversation();
    }
  },[webClient])

  const startConversation = async () => {
    const registerCallResponse = await registerCall(agentId);
    if (registerCallResponse.callId && webClient) {
      webClient
        .startConversation({
          callId: registerCallResponse.callId,
          sampleRate: registerCallResponse.sampleRate,
          enableUpdate: true,
        })
        .catch(console.error);
      setIsCalling(true); // Update button to "Stop" when conversation starts
    }
  }

  const stopConversation = () => {
    if (isCalling && webClient) {
        webClient.stopConversation();
    } 
  }

  const toggleConversation = async () => {
    if (isCalling && webClient) {
      startConversation();
    } else {
      stopConversation();
    }
  };

  async function registerCall(agentId: string): Promise<RegisterCallResponse> {
    try {
      // Replace with your server url
      const response = await fetch(
        `${llmUrl}/register-call-on-your-server`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agentId: agentId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: RegisterCallResponse = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err as string);
    }
  }

  return {stopConversation,startConversation};

};