export default function StructuredData({ json }: { json: unknown }){
  const content = JSON.stringify(json)
  return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: content }} />
}

