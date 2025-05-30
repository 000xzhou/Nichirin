

Boba theory  
A site that reviews boba tea.  
Anyone can leave a review  
It can only be on boba Tea. (no other drink types on the menu)  
API: map(mark all locations being reviewed)

- something  
- Reviews  
- Form review submit  
- Register. (can also submit without an account)  
- Profile  
- Rating system  
- Dwt (auth)  
- admin to delete comments  
- Sql injection protection. API

A E-Commerce Site  
\- Demon Sword

- Custom design api  
- Canva. Figma, Adobe creative cloud, Placeit, PosterMyWall, Cloudinary, Printful, Spoonflower

MERN Stack  
Payment \- api     square or Stripe or apple pay or something else  
Shipping \- have a form for them to fill in. and (irl they would print out the label and ship it)

- Can also use ups api etc.  
- Tracking info. From their api.

Database Schema

* Customer Table  
* Admin Table  
  * To check invoice/shipping/etc  
  * To add new products  
* Item/product Table  
* Invoice Table

- Landing page  
- Product list  
- Product details  
- Shopping cart  
- Checkout progress  
- User auth  
- Invoice  
- How to apply discount? etc.

Insurance healthcare portal site. \[PATIENT PORTAL\]  
I feel this won’t be good on react. But w.e  
Integrated patient portal.  
Patients looking to manage their health information and appointments  
Healthcare providers needing to access and update patient records

- Providers Can See Only Their Own Patients (large)  
- Providers Can See All Patients in Their Own Medical Center (medium-large)  
- Providers Can See Everything (Full Access)

  #### **Single Center Example**

* **Access Level**: Full access for all providers within the center.  
* **Database Schema**:  
  * Simplified to not include a medical centers table.

  #### **Multiple Centers Example**

* **Access Level**: Providers can see all patients in their own medical center.  
* **Database Schema**:  
  * **Providers Table** includes `medical_center` and `access_level`.  
  * **Medical Centers Table** to manage multiple centers.  
- 

### **Key Features of the Portal**

* **User Registration and Login**: Secure registration and authentication for patients.  
* **Personal Health Records (PHR)**: Patients can view and update their health records.  
  * Need to find a standardized form online somewhere to copy.   
* **Appointment Scheduling**: Patients can schedule, view, and cancel appointments.  
* **Medication Management**: Patients can view their prescribed medications and set reminders.  
  * Should I send reminders through email? Might get an email API or just have a form that sends email through something else.  
  * **Appointment Reminders**: Send reminders for upcoming appointments.  
  * **Medication Alerts**: Notify patients about medication schedules, refills, and expirations.  
  * **Lab Results Availability**: Inform patients when new lab results are available.  
  * **Billing Reminders**: Remind patients about upcoming payment due dates or overdue bills.  
  * **General Updates**: Notify users about new features, updates to the portal, or health-related news and articles.  
  * **Secure Messages**: Inform patients about new secure messages from healthcare providers.  
* **Lab Results**: Access to lab test results and historical data.  
* **Communication**: Secure messaging system between patients and healthcare providers.  
  * Maybe. Would need some chat api.  
* **Billing Information**: View billing history and make payments.  
* **Educational Resources**: Access to articles, videos, and other health-related resources.  
  * Might not include.  
* **Notifications**: Email/SMS notifications for appointment reminders, medication alerts, etc.  
* **User Dashboard**: Personalized dashboard showing health information, upcoming appointments, notifications, etc.  
* Filling out pre-visit forms. 

Database Schema

* Patients Table  
* Appointments Table  
* Providers Table  
* Medications Table  
* LabResults Table  
* Messages Table ?  
* Notifications Table  
* Billing Table