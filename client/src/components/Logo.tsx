import cn from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <>
      <svg
        className={cn("fill-primary", className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 604.89 480.27"
      >
        <g>
          <path d="M434.38,62.82c-3.32,56.01,2.92,112.19,1.02,168.27-.5,14.79-1.86,29.76-5.35,44.15-17.66,72.67-114.16,166.64-192.4,163.08-24.37-1.11-45.8-13.94-69.5-18.02-31.35,15.76-59.69,32.41-94.05,41.49-15.13,4-65.66,15.61-72.72-3.7-6.28-17.17,10.35-27.39,19.76-38.25,18.33-21.15,50.31-67.76,51.73-95.77.47-9.19-5.92-16.65-9.57-24.9-10.91-24.62-13.6-44.74-14.43-71.57-1.7-54.73,6.03-109.98,1.52-164.77,69.25,3.11,135.43-25.14,191.75-62.82,56.87,37.15,122.68,65.92,192.25,62.82ZM406.39,89.32c-58.98-2.39-114.05-26.55-163.76-56.46-49.99,29.56-105.1,54.38-164.25,56.46l.02,167.74c-.89,22.94,23.87,47.84,24,67.98.18,28.29-23.82,71.87-40.82,94.22-2.83,3.73-7.21,6.33-8.19,10.55,3.03,2.72,35.38-8.63,40.62-10.62,26.51-10.1,49.61-25.66,76.14-35.31,35.74,21.81,68.7,36,110.22,19.17,54.94-22.27,121.87-93.04,127.01-153.99,3.29-39.05-1.29-82.84-1.51-122.47-.07-12.4,1.07-24.86.52-37.27Z" />
          <path d="M282.39,224.81c26.05,10.41,46.21,34.44,54.13,61.13,3.97,13.38,10.5,45.89-13.33,42.33-12.3-1.84-11.31-21.12-12.95-30.05-12.87-70.17-120.84-71.47-135.6-4.4-2.53,11.51-.25,34.09-17.08,34.3-21.11.26-13.04-33.03-9.18-45.06,8.41-26.22,27.97-47.75,53-58.99-48.83-42.4-15.54-122.24,50.18-113.67,37.69,4.91,61.73,42.8,52.47,79.31-3.7,14.58-12.25,24.15-21.64,35.1ZM235.79,137.97c-40.34,4.26-40.06,73.88,6.84,72.34,48.69-1.6,46.17-77.93-6.84-72.34Z" />
        </g>
        <g>
          <path d="M604.89,479.31c-25.99,3.94-52.42-4.95-75.83-15.41-11.97-5.35-26.22-12.64-37.12-19.88-3.79-2.52-10.92-9.83-14.79-10.22-5.67-.57-15.61,6.2-21.12,8.4-40.95,16.32-86.59,20.4-129.72,9.96-3.75-.91-6.86-1.57-9.93-4.12l.35-1.26c37.57-21.29,71.01-49.13,97.64-83.24,34.84-44.63,46.96-81.57,48.54-138.46,1.03-36.91-1.5-73.89-2.02-110.77,94.19,28.22,145.43,138.68,101.26,228.51-12,24.42-19.2,22.61-8.77,52.24,11.06,31.45,31.77,57.96,51.51,84.24Z" />
        </g>
      </svg>
    </>
  );
}