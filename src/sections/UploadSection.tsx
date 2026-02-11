import { useState, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Upload, File, X, Check, Loader2 } from 'lucide-react';
import type { UploadedDocument } from '@/types';

interface UploadSectionProps {
  documents: UploadedDocument[];
  onUpload: (file: File) => void;
}

export function UploadSection({ documents, onUpload }: UploadSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.size <= 20 * 1024 * 1024) { // 20MB limit
        simulateUploadProgress(file);
        onUpload(file);
      }
    });
  }, [onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.size <= 20 * 1024 * 1024) {
        simulateUploadProgress(file);
        onUpload(file);
      }
    });
  }, [onUpload]);

  const simulateUploadProgress = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [file.name]: Math.min(progress, 100) }));
    }, 200);
  };

  const getStatusIcon = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-emerald-400" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />;
      case 'error':
        return <X className="w-4 h-4 text-rose-400" />;
      default:
        return <File className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <section ref={ref} className="min-h-screen w-full flex items-center justify-center relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-glow-violet opacity-20" />
      
      <div 
        className={`relative w-[90vw] max-w-6xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white uppercase mb-6">
              Upload Your Work
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Drag & drop transcripts, project reports, and certificates. Our AI parses and structures your achievements.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm text-muted-foreground">Automatic text extraction</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm text-muted-foreground">Multi-format support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm text-muted-foreground">Secure cloud storage</span>
              </div>
            </div>
          </div>

          {/* Right Dropzone */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative bg-glass rounded-3xl p-8 border-2 border-dashed transition-all duration-300 ${
                isDragging 
                  ? 'border-cyan-400 bg-cyan-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Scan Line Animation */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan opacity-50" />
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-cyan-400" />
                </div>
                
                <p className="text-white font-medium mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  PDF, DOCX, PNG (max 20 MB each)
                </p>

                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <File className="w-4 h-4" />
                  Select Files
                </label>
              </div>

              {/* Document List */}
              {documents.length > 0 && (
                <div className="mt-8 space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Uploaded Documents</p>
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      {getStatusIcon(doc.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(doc.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      {doc.status === 'processing' && uploadProgress[doc.name] !== undefined && (
                        <div className="w-20">
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[doc.name]}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}