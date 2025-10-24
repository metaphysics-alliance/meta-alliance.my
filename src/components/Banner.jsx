import { Link } from 'react-router-dom';

export default function Banner({ title, sub, description, actions }) {
  return (
    <header className="relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] -mt-8 -mb-8 min-h-[50vh] flex items-center text-center rounded-none border-0 p-8 md:p-12 overflow-hidden">
      <img src="/page-banner.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.75 }} />
      <div className="relative z-10 mx-auto max-w-3xl">
        {sub ? <p className="text-xs uppercase tracking-[0.3em] text-white/60">{sub}</p> : null}
        <h1 className="title-gradient mt-3 text-3xl font-semibold md:text-5xl pb-[10px]">{title}</h1>
        {description ? <p className="mt-3 max-w-3xl text-white/70">{description}</p> : null}
        {actions && (
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
            {actions.map((action, index) => (
              <Link key={index} to={action.href} className={action.className}>
                {action.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
