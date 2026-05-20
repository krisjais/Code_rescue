import dynamic from "next/dynamic";
import { memo } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#070b14] text-sm text-slate-400">
      Loading Monaco editor...
    </div>
  )
});

const DiffEditor = dynamic(() => import("@monaco-editor/react").then((mod) => mod.DiffEditor), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#070b14] text-sm text-slate-400">
      Loading Monaco diff...
    </div>
  )
});

type MonacoPaneProps = {
  language: string;
  value: string;
  onChange: (value: string) => void;
  diffMode?: boolean;
  originalValue?: string;
};

export const MonacoPane = memo(function MonacoPane({
  language,
  value,
  onChange,
  diffMode = false,
  originalValue = ""
}: MonacoPaneProps) {
  if (diffMode) {
    return (
      <DiffEditor
        height="100%"
        language={language}
        theme="vs-dark"
        original={originalValue}
        modified={value}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace",
          lineHeight: 22,
          padding: { top: 18, bottom: 18 },
          smoothScrolling: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          readOnly: true
        }}
      />

    );
  }

  return (
    <MonacoEditor
      height="100%"
      language={language}
      theme="vs-dark"
      value={value}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace",
        lineHeight: 22,
        padding: { top: 18, bottom: 18 },
        smoothScrolling: true,
        scrollBeyondLastLine: false,
        tabSize: 2,
        wordWrap: "on"
      }}
      onChange={(next) => onChange(next ?? "")}
    />
  );
});

