/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

      it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
      });



      it('has a URL defined and that the URL is not empty', function() {
       //Para cada url do vetor allFeeds verifica-se se ela está definida e
       //se não está vazia
       for (var i = 0; i < allFeeds.length; i++) {
         expect(allFeeds[i].url).toBeDefined();
         expect(allFeeds[i].url).not.toBe('');
       }
      });


      it('has a name defined and that the name is not empty', function() {
       //Para cada nome no vetor allFeeds verifica-se se ela está definido e
       //se não está vazio
       for (var i = 0; i < allFeeds.length; i++) {
         expect(allFeeds[i].name).toBeDefined();
         expect(allFeeds[i].name).not.toBe('');
       }
      });
    });


    describe('The menu', function() {

      it('is hidden by default', function() {
         //Verifica-se se o body possui a classe menu-hidden, que é
         //a classe que fica ativa no body quando o menu está escondido
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });

      it('changes visibility when the menu icon is clicked', function() {
        var menuIcon = $('.menu-icon-link');
        var body = $('body');
        //Inicialmente o menu está escondido e por isso
        //o body possui a classe menu-hidden

        //Após o clique espera-se que o menu tenha mudado de estado
        menuIcon.click();
        expect(body.hasClass('menu-hidden')).toBe(false);

        //Após o clique espera-se que o menu tenha mudado de estado novamente
        menuIcon.click();
        expect(body.hasClass('menu-hidden')).toBe(true);
      });
    });

    describe('Initial Entries', function() {
      //A função loadFeed é executaa de froma assíncrona antes de qualquer teste
      //ser executado
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it('exists in the feed container after loadFeed completes its work', function () {
        var entries = $('.feed .entry-link .entry');
        //Espera-se que após a execução da função loadFeed o container não
        // esteja vazio, e possua entradas
        expect(entries.length).toBeGreaterThan(0);
      });
    });

    describe('New Feed Selection', function() {
      //A função loadFeed é executaa de froma assíncrona antes de qualquer teste
      //ser executado
      var content1, content2;
      beforeEach(function(done) {
        //Executa a função loadFeed para o índice 0 e guarda o conteúdo
        //do feed em content1 e na função de callback chama a função loadFeed
        //para o índice 1, garantindo que a chamada loadFeed com índice 1
        //será executada depois da chamada de loadFeed com índice 0. O feed
        //é armazenado em cada uma das chamadas para que possa ser comparado
        //posteriormente e seja verificado que ouve mudança.
        loadFeed(0, function() {
          content1 = $('.feed').html();

          loadFeed(1, function() {
            content2 = $('.feed').html();
            done();
          });

        });
      });

      it('changes when a new feed is loaded by the loadFeed function', function () {
        //Espera-se que após a execução da função loadFeed pelo menos um nó
        //seja inserido no feed, e que content1 seja diferente de content2,
        //sinalizando que há modificação no feed quando a função loadFeed
        //é chamada.
        expect(content1).not.toEqual(content2);
      });
    });
}());
