import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, Download, Terminal, ShieldAlert, KeyRound, Check, FileDown, RefreshCw } from "lucide-react";

interface ResumeVaultProps {
  onResumeDownloaded: () => void;
}

type VaultState = "locked" | "verifying" | "unlocked" | "downloading";

export default function ResumeVault({ onResumeDownloaded }: ResumeVaultProps) {
  const [vaultState, setVaultState] = useState<VaultState>("locked");
  const [passcode, setPasscode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDialClick = (num: string) => {
    if (vaultState !== "locked") return;
    setErrorMessage(null);
    if (passcode.length < 4) {
      const newPass = passcode + num;
      setPasscode(newPass);

      // Simple auto-submission on 4 characters
      if (newPass === "2204" || newPass === "2026") {
        triggerUnlockSequence();
      } else if (newPass.length === 4) {
        // Trigger generic authorized sequence after short simulated delay
        triggerSimulatedOverride();
      }
    }
  };

  const handleClear = () => {
    setPasscode("");
    setErrorMessage(null);
  };

  const triggerSimulatedOverride = () => {
    setVaultState("verifying");
    setTimeout(() => {
      setVaultState("unlocked");
    }, 1800);
  };

  const triggerUnlockSequence = () => {
    setVaultState("verifying");
    setTimeout(() => {
      setVaultState("unlocked");
    }, 1200);
  };

 const handleDownload = async () => {
  try {
    setVaultState("downloading");

    const response = await fetch("/api/resume/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Download failed");
    }

    // Download the PDF after analytics are saved
    const link = document.createElement("a");

    link.href = "/resume/resume-v1.pdf";
    link.setAttribute("download", "Prashanth_Gouda_Resume.pdf");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onResumeDownloaded();

    setTimeout(() => {
      setVaultState("unlocked");
    }, 1500);

  } catch (error) {
    console.error(error);
    setErrorMessage("Unable to download resume.");
    setVaultState("unlocked");
  }
};

    setTimeout(() => {
      setVaultState("unlocked");
      // Trigger live counter refresh in App state
      onResumeDownloaded();
    }, 2000);
  };

  const handleManualOverride = () => {
    setErrorMessage(null);
    setPasscode("OVERRIDE");
    triggerSimulatedOverride();
  };

  return (
    <section id="vault" className="relative py-24 w-full overflow-hidden">
      {/* Background cyber radial matrix */}
      <div className="absolute inset-0 cyber-grid-fine opacity-5 pointer-events-none" />

      <div className="relative w-[92%] max-w-7xl mx-auto z-10 flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30">
            <KeyRound className="w-3.5 h-3.5 text-cyber-purple" />
            <span className="font-mono text-[10px] tracking-widest text-cyber-purple uppercase">Secure Enclave</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Resume Core Vault
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
            Declassify Prashanth Gouda's technical dossier. Input security passcode <span className="text-cyber-cyan font-mono font-bold">"2204"</span> or trigger secondary manual system bypass to open the capsule.
          </p>
        </div>

        {/* VAULT WRAPPER BOX */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative overflow-hidden">
          {/* Neon laser decorative line */}
          <div className="absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />

          {/* Left Column: Security Interface / Controls */}
          <div className="md:col-span-5 flex flex-col items-center space-y-6">
            <div className="w-full bg-dark-bg/90 border border-white/5 rounded-2xl p-5 space-y-4 font-mono text-xs">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="text-gray-500">DECRYPTOR_CORE:</span>
                <span className={`font-bold tracking-wider ${
                  vaultState === "locked" ? "text-red-500 animate-pulse" :
                  vaultState === "verifying" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                  {vaultState === "locked" && "■ COLD_LOCK"}
                  {vaultState === "verifying" && "▣ COMPILING..."}
                  {(vaultState === "unlocked" || vaultState === "downloading") && "▲ UNLOCKED"}
                </span>
              </div>

              {/* Security code readout indicator */}
              <div className="h-12 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center text-center px-4 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={passcode || "empty"}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`text-lg tracking-[0.5em] font-extrabold ${
                      vaultState === "unlocked" ? "text-cyber-cyan" : "text-white"
                    }`}
                  >
                    {passcode ? passcode : "----"}
                  </motion.span>
                </AnimatePresence>

                {/* Laser scan line overlay */}
                <div className="absolute inset-x-0 h-[1px] bg-cyber-cyan/30 shadow-[0_0_8px_rgba(0,245,255,0.8)] animate-scanline pointer-events-none" />
              </div>

              {/* Passcode Num Dial */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleDialClick(num)}
                    disabled={vaultState !== "locked"}
                    className="h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-cyber-cyan/10 border border-white/5 hover:border-white/10 text-white font-bold text-sm transition-all duration-150 focus:outline-none disabled:opacity-40"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  disabled={vaultState !== "locked"}
                  className="h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/15 focus:outline-none disabled:opacity-40"
                >
                  CLEAR
                </button>
                <button
                  onClick={() => handleDialClick("0")}
                  disabled={vaultState !== "locked"}
                  className="h-10 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/5 focus:outline-none disabled:opacity-40"
                >
                  0
                </button>
                <button
                  onClick={handleManualOverride}
                  disabled={vaultState !== "locked"}
                  className="h-10 rounded-lg bg-cyber-cyan/10 hover:bg-cyber-cyan/20 text-cyber-cyan text-[10px] font-bold border border-cyber-cyan/15 focus:outline-none disabled:opacity-40"
                >
                  BYPASS
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Graphic Chamber Capsule */}
          <div className="md:col-span-7 flex flex-col items-center justify-center p-4 relative min-h-[300px]">
            
            <AnimatePresence mode="wait">
              {vaultState === "locked" && (
                <motion.div
                  key="locked-vault"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center space-y-6 text-center"
                >
                  {/* Glowing vault mechanical lock wheel */}
                  <div className="relative w-36 h-36 rounded-full border-4 border-dashed border-red-500/20 flex items-center justify-center animate-spin" style={{ animationDuration: "25s" }}>
                    <div className="absolute inset-4 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-500/5 border border-red-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                        <Lock className="w-8 h-8 text-red-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-white">REPOS_DOCKET_ENCRYPTED</h3>
                    <p className="text-gray-500 text-xs font-mono max-w-xs">
                      Core database holds dossier metadata. Input authorized coordinates to spin security lock.
                    </p>
                  </div>
                </motion.div>
              )}

              {vaultState === "verifying" && (
                <motion.div
                  key="verifying-vault"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center space-y-6 text-center"
                >
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* Pulsing ring indicator */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyber-cyan animate-ping opacity-25" />
                    <div className="absolute inset-4 rounded-full border border-dashed border-cyber-cyan animate-spin" style={{ animationDuration: "3s" }} />
                    <div className="w-20 h-20 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
                      <RefreshCw className="w-8 h-8 text-cyber-cyan animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <h3 className="text-cyber-cyan font-bold animate-pulse">DECRYPTING QUANTUM BLOCKS...</h3>
                    <p className="text-gray-500">
                      Aligning hash signatures, scanning container metadata.
                    </p>
                  </div>
                </motion.div>
              )}

              {(vaultState === "unlocked" || vaultState === "downloading") && (
                <motion.div
                  key="unlocked-vault"
                  initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="flex flex-col items-center space-y-6 text-center"
                >
                  {/* Glowing active unlocked capsule */}
                  <div className="relative w-44 h-44 rounded-2xl bg-cyber-cyan/5 border border-cyber-cyan/30 p-[1.5px] shadow-[0_0_35px_rgba(0,245,255,0.15)] flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan/20 via-transparent to-cyber-purple/20 animate-pulse" />
                    
                    <div className="w-full h-full bg-dark-bg/95 rounded-2xl flex flex-col items-center justify-center p-4 space-y-3 relative z-10">
                      <Unlock className="w-10 h-10 text-cyber-cyan animate-bounce" />
                      <div className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">
                        DOSSIER_VER_3.5.pdf
                      </div>
                      <div className="w-24 h-1 bg-cyber-cyan rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
                    </div>

                    {/* Perimeter sweep lines */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-cyan" />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-display font-extrabold text-xl text-white">ACCESS GRANTED</h3>
                      <p className="text-gray-400 text-xs font-mono max-w-sm leading-relaxed">
                        Secure declassification pipeline is open. Download file and increment global counters.
                      </p>
                    </div>

                    <button
                      onClick={handleDownload}
                      disabled={vaultState === "downloading"}
                      className="inline-flex items-center space-x-2.5 px-6 py-3 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple hover:opacity-95 text-dark-bg font-mono font-bold text-xs tracking-widest uppercase rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:shadow-[0_0_35px_rgba(0,245,255,0.4)] transition-all duration-300 disabled:opacity-50"
                    >
                      {vaultState === "downloading" ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>FETCHING STREAM...</span>
                        </>
                      ) : (
                        <>
                          <FileDown className="w-4 h-4" />
                          <span>DECLASSIFY DOSSIER</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
