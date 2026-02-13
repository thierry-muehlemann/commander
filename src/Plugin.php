<?php

namespace thierrysh\craftcommander;

use Craft;
use craft\base\Event;
use craft\base\Model;
use craft\base\Plugin as BasePlugin;
use craft\helpers\App;
use craft\web\View;
use thierrysh\craftcommander\assets\CommanderAsset;
use thierrysh\craftcommander\models\Settings;

/**
 * Commander plugin
 *
 * @method static Plugin getInstance()
 * @method Settings getSettings()
 * @author thierrysh <thierry.sh@pm.me>
 * @copyright thierrysh
 * @license https://craftcms.github.io/license/ Craft License
 */
class Plugin extends BasePlugin
{
  public string $schemaVersion = '1.0.0';
  public bool $hasCpSettings = true;

  public static function config(): array
  {
    return [
      'components' => [
        // Define component configs here...
      ],
    ];
  }

  public function init(): void
  {
    parent::init();

    $this->attachEventHandlers();

    // Any code that creates an element query or loads Twig should be deferred until
    // after Craft is fully initialized, to avoid conflicts with other plugins/modules
    Craft::$app->onInit(function () {
      // ...
    });
  }

  protected function createSettingsModel(): ?Model
  {
    return Craft::createObject(Settings::class);
  }

  protected function settingsHtml(): ?string
  {
    return Craft::$app->view->renderTemplate('commander/_settings.twig', [
      'plugin' => $this,
      'settings' => $this->getSettings(),
    ]);
  }

  private function attachEventHandlers(): void
  {
    // Register event handlers here ...
    // (see https://craftcms.com/docs/5.x/extend/events.html to get started)

    // Only load in the control panel
    if (Craft::$app->getRequest()->getIsCpRequest()) {
      Event::on(
        View::class,
        View::EVENT_BEFORE_RENDER_TEMPLATE,
        function () {
          Craft::$app->getView()->registerAssetBundle(CommanderAsset::class);

          Craft::$app->getView()->registerJsVar('commanderConfig', [
            'siteUrl' => Craft::$app->getSites()->getPrimarySite()->baseUrl,
            'env' => Craft::$app->config->env,
            'entries' => [
              'sections' =>
              array_map(
                fn($section) => [
                  'handle' => $section->handle,
                  'name' => $section->name,
                  'id' => $section->id
                ],
                Craft::$app->getEntries()->getAllSections()
              )
            ],
            'globals' => [
              'sets' =>
              array_map(
                fn($section) => [
                  'handle' => $section->handle,
                  'name' => $section->name,
                  'id' => $section->id
                ],
                Craft::$app->getGlobals()->getAllSets()
              )
            ]
          ]);
        }
      );
    }
  }
}
