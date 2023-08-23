import React from "react";
import AdminLayout from "../../components/AdminLayout";

/**
 * @component The component for the admin-side home page
 */
export default function AdminHomePage(props) {
  return (
    <AdminLayout sidebar selectedLink="documentation">
        <h2>Documentation</h2>
        <div style={{ borderBottom: "1px solid silver" }} />
        <div style={{ paddingRight: "100px" }}>
          <p>Last Updated: 05/17/2022</p>
          <h3>Overview</h3>
          <p>
            The Admin Dashboard allows an administrator to view documentation,
            create/edit/delete lists, and view user information as logs of each
            database operation done by admin accounts. It is subdivided into
            four main categories which are displayed as tabs on the left-hand
            side of the screen:
          </p>
          <ul>
            <li>Documentation</li>
            <li>Users</li>
            <li>Lists</li>
            <li>Logs</li>
          </ul>
          <p>
            Simply clicking on a tab will take you to that destination, to
            return to the default Admin Dashboard home screen click on
            “Documentation” from the selection of tabs on the left or the “Court
            Reporter Pro | Admin Dashboard” at the top of the webpage.
          </p>
          <h3>Documentation</h3>
          <p>
            The documentation tab of the Admin Dashboard contains the
            information necessary for a new or existing administrator to
            understand the workings of the Admin dashboard. Any future updates
            to Court Reporter Pro’s Admin Dashboard will need to be reflected
            upon release.
          </p>
          <h3>Users</h3>
          <p>
            The Users tab is a list of users of the Court Reporter Pro website.
            The list is ordered by the signup date of each user. To find a
            specific user in the results use CTRL + F and search using a
            user-specific string such as an email or phone number.
          </p>
          <p>
            The content of each user is limited to First Name, Last Name, Email,
            Phone Number, Subscription Status, and Date Created.
          </p>
          <h3>Lists</h3>
          <p>
            The Lists tab displays the lists of words, by topic, including
            default predefined practice lists for all registered users.
          </p>
          <p>
            To begin editing lists, find the List dropdown box on the top middle
            of the screen and select one from the options given. Each list is
            displayed five terms at a time, navigation buttons within the list
            are in the bottom right-hand corner of the list box. Checkboxes are
            available from this view to easily remove terms using the DELETE
            SELECTED LIST TERM(S) from the top of the screen.
          </p>
          <p>
            To add a list, select the ADD LIST button at the top of the screen.
            A small box will appear, type the name of the new list, and push the
            SAVE button on the screen. The new list will appear in the list box.
            Please note that lists are not able to be renamed in this current
            verison.
          </p>
          <p>
            To delete a list, select the DELETE LIST button at the top of the
            screen. The Delete List box will appear. Select the checkbox next to
            the desired list to delete
          </p>
          <p>
            To add a term to a list, select the ADD TERM(S) button at the top of
            the screen and then select a list from the box that appears. Press
            the Add+ button to add a term up to a maximum of 8 terms at a time.
            Press the Remove- button to remove terms from the bottom up.
          </p>
          <h3>Logs</h3>
          <p>
            The logs section is a list of actions taken on the default Lists
            provided by Court Reporter Pro under the Admin Dashboard. Adding and
            removing lists and terms are displayed with details about the
            action, along with the date and time, and who performed the action.
          </p>
          <br />
          <br />
        </div>
    </AdminLayout>
  );
}
