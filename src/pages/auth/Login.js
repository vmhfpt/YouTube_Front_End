import { Link } from "react-router-dom";
import styles from './Login.module.css';
export function Login(){
    return (
            <div>
                <main>
                    <div className={styles.row}>
                        <div className={styles.colm_logo}>
                            <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="Logo"/>
                            <h2>Facebook helps you connect and share with the people in your life.</h2>
                        </div>
                        <div className={styles.colm_form}>
                            <div className={styles.form_container}>
                                <input type="text" placeholder="Email address or phone number"/>
                                <input type="password" placeholder="Password"/>
                                <button className={styles.btn_login}>Login</button>
                                <Link to="/videos">Forgotten password?</Link>
                                <button className={styles.btn_new}>Create new Account</button>
                            </div>
                            <p><Link to="videos"><b>Create a Page</b></Link> for a celebrity, brand or business.</p>
                        </div>
                    </div>
                </main>
                <footer>
                    <div className={styles.footer_contents}>
                        <ol>
                            <li>English (UK)</li>
                            <li><Link to="/videos">മലയാളം</Link></li>
                            <li><Link to="/videos">தமிழ்</Link></li>
                            <li><Link to="/videos">తెలుగు</Link></li>
                            <li><Link to="/videos">বাংলা</Link></li>
                            <li><Link to="/videos">اردو</Link></li>
                            <li><Link to="/videos">हिन्दी</Link></li>
                            <li><Link to="/videos">ಕನ್ನಡ</Link></li>
                            <li><Link to="/videos">Español</Link></li>
                            <li><Link to="/videos">Português (Brasil)</Link></li>
                            <li><Link to="/videos">Français (France)</Link></li>
                            {/* <li><button>+</button></li> */}
                        </ol>
                        <small>Facebook © 2022</small>
                    </div>
                </footer>
            </div>
    );
}