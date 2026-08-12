import React, { useState } from 'react';
import { FileCode, Download, Copy, Check, Globe, HelpCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { generateStandaloneHtml } from '../utils/htmlExporter';

interface HtmlExporterModalProps {
  onClose: () => void;
}

export const HtmlExporterModal: React.FC<HtmlExporterModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const htmlContent = generateStandaloneHtml('facebook_feed.json');

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'facebook_page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xl border border-gray-200 dark:border-[#393A3B] p-6 max-w-5xl mx-auto my-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#393A3B] pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-[#1877F2]" />
            Esporta Pagina HTML Standalone per il tuo Sito
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Il file HTML generato manterrà la grafica fedele di Facebook e aggiornerà i post dinamicamente leggendo il file <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-[#1877F2]">facebook_feed.json</code>!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadHtml}
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow"
          >
            <Download className="w-4 h-4" />
            <span>Scarica `facebook_page.html`</span>
          </button>
        </div>
      </div>

      {/* Deployment Guide Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-blue-50/60 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 space-y-2">
          <div className="w-7 h-7 rounded-full bg-[#1877F2] text-white font-bold flex items-center justify-center text-xs">
            1
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">Scarica i 2 File</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Scarica il file <code className="font-mono bg-white dark:bg-gray-800 px-1">facebook_page.html</code> e il file <code className="font-mono bg-white dark:bg-gray-800 px-1">facebook_feed.json</code>.
          </p>
        </div>

        <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-2">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
            2
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">Carica sul tuo Hosting</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Carica entrambi i file nella stessa cartella sul tuo server web (WordPress, Aruba, Altervista, Netlify, Apache, ecc.).
          </p>
        </div>

        <div className="bg-purple-50/60 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-2">
          <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
            3
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">Aggiornamento Dinamico</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Ogni volta che vuoi aggiornare i post, ti basterà sostituire il file <code className="font-mono bg-white dark:bg-gray-800 px-1">facebook_feed.json</code> senza toccare l'HTML!
          </p>
        </div>

      </div>

      {/* Code Display Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#1877F2]" />
            Codice Sorgente HTML Standalone:
          </label>
          
          <button
            onClick={handleCopyCode}
            className="bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 font-semibold px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-[#1877F2]" />}
            <span>{copied ? 'Copiato!' : 'Copia Codice HTML'}</span>
          </button>
        </div>

        <pre className="p-4 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl max-h-96 overflow-y-auto leading-relaxed border border-slate-800 select-all">
          {htmlContent}
        </pre>
      </div>

    </div>
  );
};
