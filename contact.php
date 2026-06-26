<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Récupération des données du formulaire
    $nom = htmlspecialchars($_POST['nom']);
    $email_client = filter_var($_POST['email_expediteur'], FILTER_SANITIZE_EMAIL);
    $message_contenu = htmlspecialchars($_POST['message']);

    // 2. Ta configuration (Ton adresse de réception)
    $to = "tompelloile6@gmail.com"; 
    $subject = "Nouveau message Portfolio de : $nom";
    
    // 3. Construction du corps du mail que TU vas recevoir
    $body = "Tu as reçu un nouveau message depuis ton portfolio :\n\n";
    $body .= "Nom de l'expéditeur : $nom\n";
    $body .= "Email de l'expéditeur : $email_client\n\n";
    $body .= "Message :\n$message_contenu";

    // 4. Les entêtes (Headers)
    // Le "Reply-To" permet de répondre directement à l'expéditeur en cliquant sur "Répondre" dans Gmail
    $headers = "From: Portfolio <noreply@tondomaine.com>\r\n"; 
    $headers .= "Reply-To: $email_client\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 5. Envoi du mail
    if (mail($to, $subject, $body, $headers)) {
        // Alerte de succès et retour à l'accueil
        echo "<script>alert('Merci, le message a bien été envoyé !'); window.location.href='index.html';</script>";
    } else {
        // Alerte d'erreur
        echo "<script>alert('Erreur : le serveur n\'a pas pu envoyer le mail.'); window.history.back();</script>";
    }
} else {
    // Sécurité : redirection si accès direct au fichier PHP
    header("Location: index.html");
    exit;
}
?>