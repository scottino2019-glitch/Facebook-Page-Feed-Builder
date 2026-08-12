import React, { useState } from 'react';
import { X, Download, Upload, RefreshCw, Copy, Check, FileJson, AlertCircle } from 'lucide-react';
import { FBPageData } from '../types';
import { parseJsonString } from '../utils/jsonStorage';

interface JsonManagerModalProps {
  pageData: FBPageData;
  onImportJson: (data: FBPageData) => void;
  onExportJson: () => void;
  onResetDefault: () => void;
  onClose: () => void;
}

export const JsonManagerModal: React.FC<JsonManagerModalProps> = ({
  pageData,
  onImportJson,
  onExportJson,
  onResetDefault,
  onClose
}) => {
  const [jsonText, setJsonText] = useState(JSON.stringify(pageData, null, 2));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleApplyText = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const parsed = parseJsonString(jsonText);
      onImportJson(parsed);
      setSuccessMsg("File JSON caricato ed applicato con successo!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Errore nella sintassi del file JSON.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const text = uploadEvent.target?.result as string;
        setJsonText(text);
        try {
          const parsed = parseJsonString(text);
          onImportJson(parsed);
          setErrorMsg(null);
          setSuccessMsg(`File "${file.name}" caricato con successo!`);
        } catch (err: any) {
          setErrorMsg(`Errore nel caricamento di ${file.name}: ` + err.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#242526] w-full max-w-3xl rounded-xl shadow-2xl border border-gray-200 dark:border-[#393A3B] overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#393A3B]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileJson className="w-5 h-5 text-[#1877F2]" />
            Gestione File JSON (`facebook_feed.json`)
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-2 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 text-sm max-h-[80vh] overflow-y-auto">
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I post e le informazioni del profilo vengono salvati in un file <strong>JSON</strong>. 
            Puoi scaricare il file aggiornato per il tuo sito o caricare un file JSON creato precedentemente per ripristinare la bacheca.
          </p>

          {/* Quick Action Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={onExportJson}
              className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Scarica `facebook_feed.json`</span>
            </button>

            <label className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow cursor-pointer transition-all">
              <Upload className="w-4 h-4" />
              <span>Sfoglia e Carica JSON</span>
              <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={onResetDefault}
              className="bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-amber-500" />
              <span>Ripristina Dati Esempio</span>
            </button>
          </div>

          {/* Alert Messages */}
          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-200 dark:border-red-900">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-900">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Code Viewer / Editor Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gray-800 dark:text-gray-200">
                Visualizzatore & Editor del Codice JSON:
              </label>
              <button
                onClick={handleCopy}
                className="text-xs text-[#1877F2] font-semibold hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiato!' : 'Copia JSON'}</span>
              </button>
            </div>

            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={12}
              className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl outline-none focus:ring-2 focus:ring-[#1877F2] leading-relaxed resize-none"
            />
          </div>

          {/* Footer Apply Button */}
          <div className="pt-2 flex justify-between items-center border-t border-gray-200 dark:border-[#393A3B]">
            <span className="text-xs text-gray-400">
              Assicurati che la struttura corrisponda alla versione supportata.
            </span>
            <div className="flex gap-2">
              <button 
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#3A3B3C] text-gray-800 dark:text-gray-200 font-semibold"
              >
                Chiudi
              </button>
              <button 
                onClick={handleApplyText}
                className="px-6 py-2 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold shadow"
              >
                Applica Modifiche JSON
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
