# cs465
repo for the cs465 class at SNHU

Architecture
In my full stack project, the frontend development utilized a combination of static HTML with Express for server-side rendering, standalone JavaScript for dynamic client-side interactivity, and an Angular-based single-page application (SPA) for a richer user experience. Static HTML with Express provides straightforward page rendering and routing, which is efficient for simple applications. Standalone JavaScript adds basic interactivity but requires more effort to manage state across pages. In contrast, the SPA architecture in Angular offers a seamless user experience by dynamically updating content without full-page reloads, making it ideal for modern, feature-rich applications.

The backend relied on a NoSQL MongoDB database because of its flexibility and schema-less nature, which is ideal for handling the dynamic and hierarchical data structures common in web applications. MongoDB also scales well horizontally, making it a solid choice for applications that anticipate growth in both user base and data volume.

Functionality
JSON (JavaScript Object Notation) differs from JavaScript in that it is a lightweight data format for structuring data, while JavaScript is a full programming language. JSON serves as a bridge between the frontend and backend, enabling data exchange in a consistent format. For example, the frontend may send JSON data to the backend via a POST request to create a new trip, or it may receive JSON data from the backend during a GET request to display a list of trips.

Throughout the full stack process, I refactored code to improve efficiency and maintainability. For instance, I modularized components in the Angular SPA, allowing reusable UI components like navigation bars and form inputs. This approach improved consistency across the application and reduced duplication, making the codebase easier to manage and extend.

Testing
API testing involved verifying endpoints for proper functionality using tools like Postman, which allowed me to send requests and inspect responses for accuracy. Methods such as GET, POST, and PUT were tested to ensure data retrieval and manipulation worked as intended. Testing became more complex with the addition of security layers like JWT authentication, as endpoints required valid tokens for access. This required simulating authorized requests and ensuring unauthorized requests were appropriately rejected. Understanding these methods, endpoints, and security protocols is critical for ensuring the application functions reliably and securely.

Reflection
This course has significantly contributed to my professional growth by solidifying my understanding of full stack development and modern web application architecture. I have developed skills in frontend technologies like Angular, backend frameworks like Express, and database management with MongoDB. Additionally, I have learned to implement RESTful APIs, integrate security measures, and manage state in SPAs. These skills have made me a more marketable candidate by enabling me to build scalable, maintainable, and secure web applications. My confidence in handling real-world development challenges has grown, aligning with my goal of transitioning into a technical career in software engineering.
