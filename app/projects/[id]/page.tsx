import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { MY_PROJECTS } from "@/lib/projects";
import { Metadata } from "next";

// 1. Tell Next.js which projects exist (for faster loading)
export async function generateStaticParams() {
  return MY_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

// 2. SEO: Dynamic Title & Description
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = MY_PROJECTS.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} | Rahulranks`,
    description: project.description,
  };
}

// 3. The Page Layout
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = MY_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFFBF5] text-slate-900 font-sans selection:bg-orange-200">
      
      {/* Floating Back Button */}
      <nav className="fixed top-6 left-6 z-50">
        <Link 
          href="/#projects" 
          className="flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full hover:scale-110 hover:border-orange-500 transition-all shadow-lg group"
        >
          <ArrowLeft size={20} className="text-slate-600 group-hover:text-orange-600" />
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        {/* Badges */}
        <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 text-sm font-medium">
            <Calendar size={14} /> {project.year}
          </span>
        </div>
        
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {project.name}
        </h1>
        
        {/* Description */}
        <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Visit Live <ExternalLink size={16} />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border border-gray-300 text-slate-700 px-6 py-3 rounded-full font-bold hover:border-slate-900 hover:bg-slate-50 transition-all"
            >
              Code <Github size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Image Placeholder area */}
      <div className="w-full bg-gray-100 border-y border-gray-200 py-20 px-4 mb-20">
        <div className="max-w-6xl mx-auto text-center">
            <div className="aspect-video bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100">
                <div className="text-center p-8">
                    <p className="text-4xl mb-2">📸</p>
                    <p className="text-slate-400 font-mono text-sm">Image Asset: {project.image}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="max-w-4xl mx-auto px-6 pb-32 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Tech Stack</h3>
             <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border border-gray-200 text-slate-600 rounded-lg text-xs font-bold">
                        {tag}
                    </span>
                ))}
             </div>
        </div>
        
        <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">About the Build</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
                (This is a placeholder. To make this text unique for each project, add a `longDescription` field to your `lib/projects.ts` file and I will update this code to read it.)
            </p>
        </div>
      </div>

    </main>
  );
}